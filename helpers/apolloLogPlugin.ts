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
    // Check on this issue for future improvements:
    // https://github.com/getsentry/sentry-javascript/issues/3643
    await Sentry.flush(timeout)
  } catch (error) {
    console.error('Flush failed: ', error)
  }
}

/**
 * Plugin to capture apollo errors and send a copy to sentry/logflare
 */
export const apolloLogPlugin: ApolloServerPlugin = {
  requestDidStart<TContext>(
    _: GraphQLRequestContext<TContext>
  ): GraphQLRequestListener<TContext> {
    /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
    return {
      didEncounterErrors(ctx: any) {
        // If we couldn't parse the operation, only
        // log to console / logflare
        if (!ctx.operation) {
          console.error(ctx)
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
              scope.setTransactionName(transactionId)
            }

            Sentry.captureException(err)
          })
        }
        // Log error so logflare can also receive a copy of the error
        console.error(ctx?.errors)

        /* returning promise causes apollo to wait for resolve before responding
        to user. This delay is required to ensure errors are forwarded to
        sentry.io before serverless functions shut down */
        return sentryTryFlush(2000)
      }
    }
  }
}
