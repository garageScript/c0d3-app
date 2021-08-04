import type { User } from '.prisma/client'
import type { Session } from 'express-session'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface LoggedRequest extends NextApiRequest {
  info: (obj: any) => void
  warn: (obj: any) => void
  error: (obj: any) => void
  session: UserSession
  requestId: string
  user: User | null
}

export interface UserSession extends Session {
  userId: number
}

export interface Context {
  req: LoggedRequest
  res: NextApiResponse
}
