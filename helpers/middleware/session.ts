import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import prisma from '../../prisma'
import session from 'express-session'

const ONE_DAY = 1000 * 60 * 60 * 24
const ONE_WEEK = ONE_DAY * 7

// This needs to be a function because otherwise the moment this file is required (for example in test),
// prisma would try to make a db connection.
// Making this a function will allow this file to be required normally without any side effects (like automatically connecting to prisma)

export const sessionMiddleware = () =>
  session({
    secret: process.env.SESSION_SECRET as string,
    store: new PrismaSessionStore(prisma, {
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
      checkPeriod: ONE_DAY
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: ONE_WEEK
    }
  })

export default sessionMiddleware
