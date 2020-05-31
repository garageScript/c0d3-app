import winston from 'winston'
import { Request } from 'express'

export interface LoggedRequest extends Request {
  info: (obj: any) => void
  warn: (obj: any) => void
  error: (obj: any) => void
  requestId: string
}

export interface Context {
  req: LoggedRequest
}
