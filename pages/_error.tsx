// From Next.JS example https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/pages/_error.js
import React from 'react'
import * as Sentry from '@sentry/browser'
import { NextPageContext } from 'next'
import ErrorComponent, { StatusCode } from '../components/Error'

interface MyErrorContext extends NextPageContext {
  statusCode: number
  hasGetInitialPropsRun: boolean
}
const toStatusCode = (code: number): StatusCode => {
  if (code === 404) return StatusCode.NOT_FOUND
  return StatusCode.INTERNAL_SERVER_ERROR
}

const MyError = ({
  statusCode,
  hasGetInitialPropsRun,
  err
}: MyErrorContext) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err)
  }

  return <ErrorComponent code={toStatusCode(statusCode)} />
}

MyError.getInitialProps = async ({ res, err, asPath }: MyErrorContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const errorInitialProps = {
    statusCode,
    hasGetInitialPropsRun: false
  }

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html
  if (err) {
    Sentry.captureException(err)
    return errorInitialProps
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  )

  return errorInitialProps
}

export default MyError
