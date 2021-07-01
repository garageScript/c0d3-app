import * as Sentry from '@sentry/nextjs'
import { ApolloServer, ApolloError } from 'apollo-server-micro'
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

// This helper is needed catch a failed flush which
// rejects and stops graphql from responding to user
/* istanbul ignore next */
const sentryTryFlush: any = async () => {
  try {
    /* Ideally we could provide the timeout parameter to the flush() call to
        ensure response time is reasonable but there appears to be a bug. 
        Providing a 2000 timeout breaks the function even though my tested responses 
        were only taking 200-300 ms to respond.

        Check on this issue for future improvements: 
        https://github.com/getsentry/sentry-javascript/issues/3643
        */
    await Sentry.flush()
    console.log('Flush Success')
  } catch (error) {
    console.log('Flush failed')
  }
}

const handler: any = nextConnect() // For session middleware. TODO: Need to define types for Session
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }), // This lets GraphQL have access to sessions
  /* Syncs server schema (used for server static generation) and api route server settings. 
  By default apolloServer accepts uploads, while schema-generated server does not.*/
  uploads: false,
  plugins: [
    /* istanbul ignore next */
    {
      requestDidStart(): any {
        /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
        return {
          didEncounterErrors(ctx: any) {
            // If we couldn't parse the operation, don't
            // do anything here
            if (!ctx.operation) {
              return
            }

            for (const err of ctx.errors) {
              if (err instanceof ApolloError) {
                Sentry.captureException(err)
                /* ApolloErrors should be user-facing just report plain error
            without attaching any additional information */
                continue
              }

              // Add scoped report details and send to Sentry
              Sentry.withScope(scope => {
                // Annotate whether failing operation was query/mutation/subscription
                scope.setTag('kind', ctx.operation?.operation)

                // Log query and variables as extras (make sure to strip out sensitive data!)
                scope.setExtra('query', ctx.request.query)
                scope.setExtra('variables', ctx.request.variables)

                if (err.path) {
                  scope.addBreadcrumb({
                    category: 'query-path',
                    message: err.path.join(' > '),
                    level: Sentry.Severity.Debug
                  })
                }

                const transactionId =
                  ctx.request.http.headers.get('x-transaction-id')
                if (transactionId) {
                  scope.setTransaction(transactionId)
                }

                Sentry.captureException(err)
              })
            }
            /* returning promise causes apollo to wait for resolve before responding
        to user. This delay is required to ensure errors are forwarded to
        sentry.io before serverless functions shut down */
            console.log('Flush attempt:', ctx?.errors)
            return sentryTryFlush()
          }
        }
      }
    }
  ]
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

export default Sentry.withSentry(handler)
