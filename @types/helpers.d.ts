import winston from 'winston'
import { Request } from 'express'

export interface LoggedRequest extends Request {
  info: (obj: any) => void
  warn: (obj: any) => void
  error: (obj: any) => void
  requestId: string
  user: {
    id: String
    username: String
    userLesson: UserLesson
    email: String
    name: String
    isAdmin: String
    cliToken: String
  } | null
}

export interface Context {
  req: LoggedRequest
}
