import { ApolloProvider } from '@apollo/client'
import React, { useEffect } from 'react'
// TODO: type the posthog library
// @ts-ignore
import posthog from 'posthog-js'
import withApollo from '../helpers/withApollo'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../scss/index.scss'

import * as Sentry from '@sentry/browser'
const SENTRY_DSN = process.env.SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN
})

interface IProps extends AppProps {
  err: any
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, pageProps, err, apollo }: IProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && process.env.POSTHOG_API_KEY) {
      posthog.init(process.env.POSTHOG_API_KEY, {
        api_host: 'https://app.posthog.com'
      })
    }
  }, [])
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>C0D3.com</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} err={err} />
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
