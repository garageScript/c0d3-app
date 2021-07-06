import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  GraphQLRequestContext
} from 'apollo-server-plugin-base'
import { ApolloError } from 'apollo-server-micro'

import * as Sentry from '@sentry/nextjs'

/**
 * Temporary solution to handle Sentry.flush() possibly rejecting with 'false'.
 * TODO: Remove when issue is resolved with sentry package
 * @see https://github.com/getsentry/sentry-javascript/issues/3643
 * @param timeout — Maximum time in ms the client should wait.
 */
const sentryTryFlush: any = async (timeout?: number) => {
  try {
    await Sentry.flush(timeout)
  } catch (error) {
    console.error('Flush failed: ', error)
  }
}

/**
 * Plugin to capture errors during apollo transaction and send a copy to sentry/logflare
 */
export const apolloLogPlugin: ApolloServerPlugin = {
  requestDidStart<TContext>(
    _: GraphQLRequestContext<TContext>
  ): GraphQLRequestListener<TContext> {
    return {
      didEncounterErrors(ctx) {
        for (const err of ctx.errors) {
          /* Only add extra scope to errors with apollo operation 
             type (query/mutation/subscription) and are also not 
             already handled by an ApolloError. All  ApolloErrors 
             should be user-facing and already handled by the client
          */
          if (ctx.operation && !(err instanceof ApolloError)) {
            Sentry.withScope(scope => {
              scope.setTag('kind', ctx.operation?.operation)
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
                ctx.request.http?.headers.get('x-transaction-id')
              if (transactionId) {
                scope.setTransactionName(transactionId)
              }
            })
          }
          // Log error so logflare can also receive a copy of the error
          console.error(err)
          Sentry.captureException(err)
        }

        /* returning promise causes apollo to wait for resolve before responding
        to user. This delay is required to ensure errors are forwarded to
        sentry.io before serverless functions shut down */
        return sentryTryFlush(2000)
      }
    }
  }
}
