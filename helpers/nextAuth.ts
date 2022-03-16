import { updateRefreshandAccessTokens } from './discordAuth'
import runMiddlewares from './runMiddlewares'
import loggingMiddleware from './middleware/logger'
import sessionMiddleware from './middleware/session'
import userMiddleware from './middleware/user'
import { Account, User } from 'next-auth'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import DiscordProvider from 'next-auth/providers/discord'

export const providers = [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  })
]

export const getUserSession = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => {
  const middlewares = [loggingMiddleware, sessionMiddleware(), userMiddleware]

  return new Promise<number | null>(resolve => {
    runMiddlewares(middlewares, req, res, async () => {
      if (req.user?.id) {
        return resolve(req.user.id)
      }
      return resolve(null)
    })
  })
}

export const signIn =
  (req: LoggedRequest & Request, res: NextApiResponse & Response) =>
  async ({ account, user }: { account: Account; user: User }) => {
    const { provider } = account

    if (provider === 'discord') {
      const c0d3UserId = await getUserSession(req, res)
      const { access_token, expires_at, refresh_token } = account

      // Connect to discord
      if (c0d3UserId) {
        await updateRefreshandAccessTokens(
          c0d3UserId,
          user.id,
          refresh_token!,
          access_token!,
          new Date(expires_at! * 1000)
        )

        // Cancel auth flow. Session won't be created
        return '/discord/success'
      }
    }

    return true
  }
