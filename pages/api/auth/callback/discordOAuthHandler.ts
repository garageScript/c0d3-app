import { getTokenFromAuthCode, getUserInfoFromRefreshToken } from '../../../../helpers/discordAuth'
import { NextApiResponse } from 'next'
import { LoggedRequest } from '../../../../@types/helpers'
import nextConnect from 'next-connect'
import { withSentry } from '@sentry/nextjs'
import userMiddleware from '../../../../helpers/middleware/user'
import loggingMiddleware from '../../../../helpers/middleware/logger'
import sessionMiddleware from '../../../../helpers/middleware/session'

const handler = nextConnect()

const discordOAuthHandler = async (req: LoggedRequest, res: NextApiResponse)=> {
  const { code } = req.query

  try {
    const { refresh_token } = await getTokenFromAuthCode(code as string)
    const userInfo = await getUserInfoFromRefreshToken(req.user!.id, refresh_token)
    return res.json(userInfo)
  } catch(error) {
    res.status(400).json(error)
  }
}

handler
  .use(loggingMiddleware)
  .use(sessionMiddleware)
  .use(userMiddleware)
  .get('/api/auth/callback/discord', discordOAuthHandler)

export default withSentry(handler)

