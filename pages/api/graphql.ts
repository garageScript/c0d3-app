import { withSentry } from '@sentry/nextjs'
import { ApolloServer } from 'apollo-server-micro'
import { createRouter, expressWrapper } from 'next-connect'
import resolvers from '../../graphql/resolvers'
import typeDefs from '../../graphql/typeDefs'
import { apolloLogPlugin } from '../../helpers/apolloLogPlugin'
import loggingMiddleware from '../../helpers/middleware/logger'
import userMiddleware from '../../helpers/middleware/user'
import sessionMiddleware from '../../helpers/middleware/session'

// VERCEL_ENV is a reserved env key by Vercel that specify the deployment type: "preview", "production", or "deployment"
const isDevEnv =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

const router = createRouter()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }), // This lets GraphQL have access to sessions
  /* Syncs server schema (used for server static generation) and api route server settings.
  By default apolloServer accepts uploads, while schema-generated server does not.*/
  uploads: false,
  plugins: [apolloLogPlugin],
  ...(isDevEnv && {
    playground: {
      settings: {
        'request.credentials': 'include'
      }
    },
    introspection: isDevEnv
  })
})

const graphQLHandler = apolloServer.createHandler({ path: '/api/graphql' })

router
  .use(expressWrapper(loggingMiddleware))
  .use(expressWrapper(sessionMiddleware()))
  .use(expressWrapper(userMiddleware))
  .get('/api/graphql', graphQLHandler)
  .post('/api/graphql', graphQLHandler)

// Config needs to be exported because we are changing default values in Next.JS API https://nextjs.org/docs/api-routes/api-middlewares
// This is required for GraphQL to work properly  https://blog.logrocket.com/building-a-graphql-server-in-next-js/
export const config = {
  api: {
    bodyParser: false
  }
}

export default withSentry(router.handler())
