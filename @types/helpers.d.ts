import winston from 'winston'
import { Request } from 'express'

export interface LoggedRequest extends Request {
  info: (obj: any) => void
  warn: (obj: any) => void
  error: (obj: any) => void
  requestId: string
  user: {
    id: string
    username: string
    userLesson: UserLesson
    email: string
    name: string
    isAdmin: string
    cliToken: string
  } | null
}

export interface Context {
  req: LoggedRequest
}
