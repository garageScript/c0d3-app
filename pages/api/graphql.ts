import { ApolloServer } from 'apollo-server-micro'
import session from 'express-session'
import nextConnect from 'next-connect'
import userMiddleware from '../../helpers/middleware/user'
import loggingMiddleware from '../../helpers/middleware/logger'
import db from '../../helpers/dbload'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'
import connectSequelize from 'connect-session-sequelize'

// Sequelize Store for express-sessions
const { sequelize } = db
const SequelizeStore = connectSequelize(session.Store)

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

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
      secret: process.env.SESSION_SECRET || '',
      store: new SequelizeStore({
        db: sequelize
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
