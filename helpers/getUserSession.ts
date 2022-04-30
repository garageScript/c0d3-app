import runMiddlewares from './runMiddlewares'
import loggingMiddleware from './middleware/logger'
import sessionMiddleware from './middleware/session'
import userMiddleware from './middleware/user'
import { LoggedRequest } from '../@types/helpers'
import { Request, Response } from 'express'
import { NextApiResponse } from 'next'
import { User } from '@prisma/client'

export const getUserSession = (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) => {
  const middlewares = [loggingMiddleware, sessionMiddleware(), userMiddleware]

  return new Promise<User | null>(resolve => {
    runMiddlewares(middlewares, req, res, async () => {
      if (req.user) {
        return resolve(req.user)
      }
      return resolve(null)
    })
  })
}
