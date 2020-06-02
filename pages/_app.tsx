import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '../helpers/withApollo'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import Head from 'next/head'
import useSession from '../helpers/useSession'
import SessionContext from '../helpers/contexts/session'
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
  const session = useSession()
  return (
    <ApolloProvider client={apollo}>
      <SessionContext.Provider value={session}>
        <Head>
          <title>C0D3.com</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} err={err} />
      </SessionContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
