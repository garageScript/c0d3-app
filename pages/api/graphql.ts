import { ApolloServer } from 'apollo-server-micro'
import session from 'express-session'
import nextConnect from 'next-connect'
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
  context: ({ req }) => ({ req }) // This lets GraphQL have access to sessions
})

const graphQLHandler = apolloServer.createHandler({ path: '/api/graphql' })

handler
  .use(
    session({
      secret: process.env.SESSION_SECRET || '',
      store: new SequelizeStore({
        db: sequelize
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        domain: process.env.DB_HOST,
        maxAge: ONE_WEEK
      }
    })
  )
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
