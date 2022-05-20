import { updateRefreshandAccessTokens } from './discordAuth'
import { Account, DefaultSession, Session, User } from 'next-auth'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import DiscordProvider from 'next-auth/providers/discord'
import { getUserSession } from './getUserSession'
import prisma from '../prisma'
import { JWT } from 'next-auth/jwt'

export const providers = [
  DiscordProvider({
    clientId: process.env.DISCORD_KEY,
    clientSecret: process.env.DISCORD_SECRET
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
