import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  GraphQLRequestContext
} from 'apollo-server-plugin-base'

import * as Sentry from '@sentry/nextjs'
import { SeverityLevel } from '@sentry/types'
import { BaseContext } from 'next/dist/shared/lib/utils'

const levelDebug: SeverityLevel = 'debug'

/**
 * Plugin to capture errors during apollo transaction and send a copy to sentry/logflare
 */
export const apolloLogPlugin: ApolloServerPlugin = {
  requestDidStart<TContext>(
    _: GraphQLRequestContext<TContext>
  ): GraphQLRequestListener<BaseContext> {
    return {
      didEncounterErrors(ctx) {
        for (const err of ctx.errors) {
          Sentry.withScope(scope => {
            scope.setTag('kind', ctx.operation?.operation)
            scope.setExtra('query', ctx.request.query)
            scope.setExtra('variables', ctx.request.variables)

            if (err.path) {
              scope.addBreadcrumb({
                category: 'query-path',
                message: err.path.join(' > '),
                level: levelDebug
              })
            }

            const transactionId =
              ctx.request.http?.headers.get('x-transaction-id')
            if (transactionId) {
              scope.setTransactionName(transactionId)
            }
            Sentry.captureException(err)
          })
          // Log error so logflare can also receive a copy of the error
          console.error(err)
        }
      }
    }
  }
}
