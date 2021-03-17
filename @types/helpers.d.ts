import winston from 'winston'
import { Request, Response } from 'express'
import { Session } from 'express-session'

export interface LoggedRequest extends Request {
  info: (obj: any) => void
  warn: (obj: any) => void
  error: (obj: any) => void
  session: UserSession
  requestId: string
  user: {
    id: number
    username: string
    userLesson: UserLesson
    email: string
    name: string
    isAdmin: string
    cliToken: string
  } | null
}

export interface UserSession extends Session {
  userId: number
}

export interface Context {
  req: LoggedRequest
  res: Response
}
