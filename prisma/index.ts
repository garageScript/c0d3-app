import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prismag: PrismaClient
}

const prismaOptions = {
  datasources: {
    db: {
      url: `postgresql://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?connection_limit=1`
    }
  }
}

// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
export let prisma: PrismaClient

// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions)
} else {
  if (!global.prismag) {
    global.prismag = new PrismaClient(prismaOptions)
  }
  prisma = global.prismag
}

export default prisma
