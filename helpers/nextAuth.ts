import { updateRefreshandAccessTokens } from './discordAuth'
import { Account, DefaultSession, Session, User } from 'next-auth'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import { getUserSession } from './getUserSession'
import { get, toNumber, toString } from 'lodash'
import { login, signup } from '../graphql/resolvers/authController'
import prisma from '../prisma'
import DiscordProvider from 'next-auth/providers/discord'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'

type Credentials =
  | Record<'username' | 'password' | 'email' | 'firstName' | 'lastName', string>
  | undefined

export const authorize =
  (req: LoggedRequest & Request, res: NextApiResponse & Response) =>
  async (credentials: Credentials) => {
    const context = { req, res }

    const username = get(credentials, 'username')
    const password = get(credentials, 'password')
    const email = get(credentials, 'email')
    const firstName = get(credentials, 'firstName')
    const lastName = get(credentials, 'lastName')

    const isSignUpFlow = username && email && firstName && lastName && password
    const isLoginFlow = username && password

    const user = isSignUpFlow
      ? await signup(
          undefined,
          {
            username,
            email,
            password,
            firstName,
            lastName
          },
          context
        )
      : isLoginFlow && (await login(undefined, { username, password }))

    if (!user) return null

    const dbUser = await prisma.user.findFirst({
      where: { id: user.id }
    })

    return dbUser
  }

export const providers = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => [
  DiscordProvider({
    clientId: process.env.DISCORD_KEY,
    clientSecret: process.env.DISCORD_SECRET
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
  })
]

export const signIn =
  (req: LoggedRequest & Request, res: NextApiResponse & Response) =>
  async ({ account, user }: { account: Account; user: User }) => {
    const { provider } = account

    if (provider === 'discord') {
      const c0d3User = await getUserSession(req, res)
      const { access_token, expires_at, refresh_token } = account

      // Connect to discord
      if (c0d3User?.id) {
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

// jwt callback is first called then session callback
export const jwt = async ({
  token,
  user,
  account
}: {
  token: JWT
  user?: User
  account?: Account
}) => {
  // For Discord. Will only run once.
  if (get(account, 'type') === 'oauth' && user) {
    const dbUser = await prisma.user.findFirst({
      where: {
        discordId: toString(user.id)
      }
    })

    token.user = dbUser
  }

  // For Credentials or Login/Signup. Will only run once
  if (get(account, 'type') === 'credentials') {
    token.user = user
  }

  return token
}

export const session = async ({
  session,
  token
}: {
  session: Session
  token: JWT
}) => {
  // Will run for each getSession or useSession call
  const dbUser = await prisma.user.findFirst({
    where: {
      id: toNumber((token.user as User).id)
    }
  })

  session.user = dbUser as DefaultSession['user']
  return session
}
