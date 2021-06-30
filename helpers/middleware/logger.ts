import util from 'util'
import { nanoid } from 'nanoid'
import winston from 'winston'
import Sentry from 'winston-transport-sentry-node'
import { TransformableInfo } from 'logform' // Types for Winston
import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

export const processArgs = (inputArr: any) => {
  if (Array.isArray(inputArr)) {
    const args = inputArr.map(e => {
      if (e instanceof Error) {
        return e.toString()
      }
      return e
    })
    return util.format('%j', args)
  } else if (inputArr instanceof Error) {
    return inputArr.toString()
  }
  return inputArr
}

export const printFunc = (info: TransformableInfo) => {
  return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
}

export const winstonLogger = (sessionId: string) => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.label({
        label: sessionId
      }),
      winston.format.colorize(),
      winston.format.printf(printFunc)
    ),
    transports: [
      new winston.transports.Console(),
      new Sentry({
        sentry: {
          dsn: SENTRY_DSN
        }
      })
    ],
    exceptionHandlers: [
      new winston.transports.Console(),
      new Sentry({
        sentry: {
          dsn: SENTRY_DSN
        }
      })
    ]
  })
}

export default (req: LoggedRequest, res: NextApiResponse, next: () => void) => {
  const uid = nanoid()
  const logger = winstonLogger(uid)

  req.info = (val: any) => {
    logger.info(processArgs(val))
  }
  req.warn = (val: any) => {
    logger.warn(processArgs(val))
  }
  req.error = (val: any) => {
    logger.error(processArgs(val))
  }
  req.requestId = uid
  res.setHeader('c0d3-debug-id', uid)
  next()
}
