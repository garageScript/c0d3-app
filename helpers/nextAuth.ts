import { updateRefreshandAccessTokens } from './discordAuth'
import { Account, DefaultSession, Session, User } from 'next-auth'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import { getUserSession } from './getUserSession'
import { get } from 'lodash'
import { login, signup } from '../graphql/resolvers/authController'
import prisma from '../prisma'
import { JWT } from 'next-auth/jwt'
import DiscordProvider from 'next-auth/providers/discord'
import CredentialsProvider from 'next-auth/providers/credentials'

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
            // Will be uncommented when signup takes password as argument
            // password,
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
    })
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

// jwt callback is first called then session callback
export const jwt = ({ token, user }: { token: JWT; user?: User }) => {
  if (user) token.user = user
  return token
}

export const session = async ({
  session,
  token
}: {
  session: Session
  token: JWT
}) => {
  session.user = token.user as DefaultSession['user']
  return session
}
