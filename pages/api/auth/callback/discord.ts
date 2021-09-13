import {
  setTokenFromAuthCode,
  getDiscordUserInfo
} from '../../../../helpers/discordAuth'
import { NextApiResponse } from 'next'
import { LoggedRequest } from '../../../../@types/helpers'
import nextConnect from 'next-connect'
import { withSentry } from '@sentry/nextjs'
import userMiddleware from '../../../../helpers/middleware/user'
import loggingMiddleware from '../../../../helpers/middleware/logger'
import sessionMiddleware from '../../../../helpers/middleware/session'

const handler = nextConnect()

const discordOAuthHandler = async (
  req: LoggedRequest,
  res: NextApiResponse
) => {
  if (!req.user) {
    return res.status(403).json({ error: 'user not logged in' })
  }

  const { code } = req.query

  try {
    const user = await setTokenFromAuthCode(req.user.id, code as string)
    const userInfo = await getDiscordUserInfo(user)
    return res.json(userInfo)
  } catch (error) {
    res.status(400).json({ error })
  }
}

handler
  .use(loggingMiddleware)
  .use(sessionMiddleware())
  .use(userMiddleware)
  .get('/api/auth/callback/discord', discordOAuthHandler)

export default withSentry(handler)
