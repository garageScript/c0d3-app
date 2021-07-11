import * as Sentry from '@sentry/nextjs'

/**
 * Temporary solution to manually check and initialize Sentry.
 * TODO: Remove when issue is resolved with sentry package
 * @see https://github.com/getsentry/sentry-javascript/issues/3643
 */
export default function sentryInitializer(): void {
  if (!Sentry.getCurrentHub().getClient()) {
    console.log('Manual Sentry.Init')
    Sentry.init({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN })
  }
}
