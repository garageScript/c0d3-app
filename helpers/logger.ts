import { nanoid } from 'nanoid'
import winston from 'winston'
import { TransformableInfo } from 'logform' // Types for Winston

export const printFunc = (info: TransformableInfo) => {
  return `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
}

export const winstonLogger = (file: string) => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.label({
        label: file
      }),
      winston.format.colorize(),
      winston.format.printf(printFunc)
    ),
    transports: [new winston.transports.Console()]
  })
}

export default (req: any, res: any, next: any) => {
  const uid = nanoid()
  req.logger = winstonLogger(__filename)
  req.id = uid
  res.setHeader('c0d3-debug-id', uid)
  next()
}
