// import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { withSentry } from '@sentry/nextjs'
import { ApolloServer } from 'apollo-server-micro'
// import session from 'express-session'
import nextConnect from 'next-connect'
import resolvers from '../../graphql/resolvers'
import typeDefs from '../../graphql/typeDefs'
import { apolloLogPlugin } from '../../helpers/apolloLogPlugin'
import loggingMiddleware from '../../helpers/middleware/logger'
import userMiddleware from '../../helpers/middleware/user'
// import prisma from '../../prisma'

// const ONE_DAY = 1000 * 60 * 60 * 24
// const ONE_WEEK = ONE_DAY * 7

const handler = nextConnect()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }), // This lets GraphQL have access to sessions
  /* Syncs server schema (used for server static generation) and api route server settings. 
  By default apolloServer accepts uploads, while schema-generated server does not.*/
  uploads: false,
  plugins: [apolloLogPlugin]
})

const graphQLHandler = apolloServer.createHandler({ path: '/api/graphql' })

// const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET as string,
//   store: new PrismaSessionStore(prisma, {
//     dbRecordIdIsSessionId: true,
//     dbRecordIdFunction: undefined,
//     checkPeriod: ONE_DAY
//   }),
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: ONE_WEEK
//   }
// })

handler
  .use(loggingMiddleware)
  // .use(sessionMiddleware)
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

export default withSentry(handler)
