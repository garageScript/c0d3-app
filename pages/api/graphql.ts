import { ApolloServer } from 'apollo-server-micro'
import session from 'express-session'
import nextConnect from 'next-connect'
import userMiddleware from '../../helpers/middleware/user'
import loggingMiddleware from '../../helpers/middleware/logger'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from '../../prisma'

const ONE_DAY = 1000 * 60 * 60 * 24
const ONE_WEEK = ONE_DAY * 7

const handler: any = nextConnect() // For session middleware. TODO: Need to define types for Session
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }), // This lets GraphQL have access to sessions
  /* Syncs server schema (used for server static generation) and api route server settings. 
  By default apolloServer accepts uploads, while schema-generated server does not.*/
  uploads: false
})

const graphQLHandler = apolloServer.createHandler({ path: '/api/graphql' })

handler
  .use(loggingMiddleware)
  .use(
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
  )
  .use(userMiddleware)
  .get('/api/graphql', graphQLHandler)
  .post('/api/graphql', graphQLHandler)

// Config needs to be exported because we are changing default values in Next.JS API https://nextjs.org/docs/api-routes/api-middlewares
// This is required for GraphQL to work properly  https://blog.logrocket.com/building-a-graphql-server-in-next-js/
export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
