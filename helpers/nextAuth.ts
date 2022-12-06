import { updateRefreshandAccessTokens } from './discordAuth'
import { Awaitable, CallbacksOptions, Session, User } from 'next-auth'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import { getUserSession } from './getUserSession'
import { toNumber, toString } from 'lodash'
import { login, signup } from '../graphql/resolvers/authController'
import prisma from '../prisma'
import DiscordProvider from 'next-auth/providers/discord'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { changePw } from '../graphql/resolvers/passwordController'
import { decode } from './encoding'
import { GraphQLError } from 'graphql'
import { User as GraphqlUser } from '../graphql'

type Credentials =
  | Record<'username' | 'password' | 'email' | 'firstName' | 'lastName', string>
  | undefined
type TokenCredentials = Record<'token' | 'password', string> | undefined

type UserData = Pick<
  GraphqlUser,
  'id' | 'username' | 'name' | 'isAdmin' | 'discordId'
>

const excludeUserData = (user: UserData | null) => {
  return {
    id: user?.id,
    username: user?.username,
    name: user?.name,
    isAdmin: user?.isAdmin,
    discordId: user?.discordId
  }
}
const throwError = (str: string) => Promise.reject(new Error(str))

export const authorize =
  (req: LoggedRequest & Request, res: NextApiResponse & Response) =>
  async (credentials: Credentials) => {
    const context = { req, res }

    const username = credentials?.username
    const password = credentials?.password
    const email = credentials?.email
    const firstName = credentials?.firstName
    const lastName = credentials?.lastName

    const isSignUpFlow = username && email && firstName && lastName
    const isLoginFlow = username && password

    const user = isSignUpFlow
      ? await signup(
          undefined,
          {
            username,
            email,
            firstName,
            lastName
          },
          context
        )
      : isLoginFlow && (await login(undefined, { username, password }))

    // Workaround. Anything other than null won't throw an error in the client side
    // If it's a signup flow, we want to return an empty user so it doesn't set the session
    if (isSignUpFlow) return {} as Awaitable<User>

    if (!user) return null

    const dbUser = (await prisma.user.findFirst({
      where: { id: user.id }
    })) as Awaitable<User | null>

    return dbUser
  }
export const authorizeEmailVerification = async (
  credentials: TokenCredentials
) => {
  try {
    const password = credentials?.password
    const token = credentials?.token

    if (!password || !token) return throwError('Missing token or password')

    const { userId } = decode(token)

    await changePw(undefined, {
      password: credentials?.password,
      token: credentials?.token
    })

    const dbUser = (await prisma.user.findFirst({
      where: {
        id: userId
      }
    })) as Awaitable<User | null>

    if (!dbUser) return null

    return dbUser
  } catch (err) {
    return throwError((err as GraphQLError).message)
  }
}

export const providers = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => [
  DiscordProvider({
    clientId: process.env.DISCORD_KEY!,
    clientSecret: process.env.DISCORD_SECRET!
  }),
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
      email: { label: 'Email', type: 'text' },
      firstName: { label: 'First name', type: 'text' },
      lastName: { label: 'Last name', type: 'text' }
    },
    authorize: authorize(req, res)
  }),
  CredentialsProvider({
    id: 'confirm-token',
    name: 'Verify token',
    credentials: {
      token: { label: 'Token', type: 'text' },
      password: { label: 'Password', type: 'password' }
    },
    authorize: authorizeEmailVerification
  })
]

export const signIn = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => {
  const signIn: CallbacksOptions['signIn'] = async ({ account, user }) => {
    if (!account) return false

    const { provider } = account

    if (provider === 'discord') {
      const c0d3User = await getUserSession(req, res)
      const { access_token, expires_at, refresh_token } = account

      // Connect to discord
      if (c0d3User?.id) {
        const differentAccountConnected = await prisma.user.findFirst({
          where: {
            discordId: user.id
          }
        })

        if (
          differentAccountConnected &&
          differentAccountConnected.id !== c0d3User.id
        ) {
          return '/discord/success?error=connected'
        }

        await updateRefreshandAccessTokens(
          c0d3User.id,
          user.id,
          refresh_token!,
          access_token!,
          new Date(expires_at! * 1000)
        )

        return true
      }

      // Login with Discord
      const userInfo = await prisma.user.findFirst({
        where: {
          discordId: user.id
        }
      })

      if (userInfo) {
        return true
      }

      return '/discord/404user'
    }

    return true
  }

  return signIn
}

// on getSession/useSession, jwt callback is first called then session callback
// what get returned is what gets set as the JWT token content
export const jwt: CallbacksOptions['jwt'] = async ({
  token,
  user,
  account
}) => {
  // for Discord. will only run once.
  if (account?.type === 'oauth' && user) {
    const dbUser = await prisma.user.findFirst({
      where: {
        discordId: toString(user.id)
      }
    })

    token.user = { id: dbUser?.id }
  }

  // for Credentials provider or Login/Signup flows. will only run once
  if (account?.type === 'credentials') {
    token.user = { id: user?.id }
  }

  return token
}

// will run for every getSession/useSession calls.
// it gets passed what the above jwt callback return as `token`
export const session: CallbacksOptions['session'] = async ({
  session,
  token
}: {
  session: Session
  token: JWT
}) => {
  if (token.user as User) {
    const dbUser = await prisma.user.findFirst({
      where: {
        id: toNumber((token.user as User).id)
      }
    })

    session.user = excludeUserData(dbUser)
  }

  return session
}
