import { updateRefreshandAccessTokens } from './discordAuth'
import { Awaitable, CallbacksOptions, DefaultSession, User } from 'next-auth'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import { getUserSession } from './getUserSession'
import { get } from 'lodash'
import { login, signup } from '../graphql/resolvers/authController'
import prisma from '../prisma'
import DiscordProvider from 'next-auth/providers/discord'
import CredentialsProvider, {
  CredentialsConfig
} from 'next-auth/providers/credentials'

export const authorize = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => {
  const authorize: CredentialsConfig['authorize'] = async credentials => {
    const context = { req, res }

    const username = get(credentials, 'username')
    const password = get(credentials, 'password')
    const email = get(credentials, 'email')
    const firstName = get(credentials, 'firstName')
    const lastName = get(credentials, 'lastName')

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
      : isLoginFlow && (await login(undefined, { username, password }, context))

    if (!user) return null

    // What we return here is passed to jwt and session callbacks
    return prisma.user.findFirst({
      where: { id: user.id }
    }) as Awaitable<User | null>
  }

  return authorize
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
  })
]

export const signIn = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => {
  const signIn: CallbacksOptions['signIn'] = async ({ account, user }) => {
    if (!account) return false
    if ('email' in user && !('id' in user)) return false

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

        // Cancel auth flow. Session won't be created
        return '/discord/success'
      }

      // Login with Discord
      const userInfo = await prisma.user.findFirst({
        where: {
          discordId: user.id
        }
      })

      if (userInfo) {
        req.session.userId = userInfo.id

        // Cancel auth flow. Session won't be created
        return '/curriculum'
      }

      return '/discord/404user'
    }

    return true
  }

  return signIn
}

// jwt callback is first called then session callback
export const jwt: CallbacksOptions['jwt'] = ({ token, user }) => {
  if (user) token.user = user
  return token
}

export const session: CallbacksOptions['session'] = async ({
  session,
  token
}) => {
  session.user = token.user as DefaultSession['user']
  return session
}
