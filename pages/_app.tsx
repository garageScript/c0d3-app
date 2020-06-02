import React, { useEffect } from 'react'
//TODO type the posthog library
// @ts-ignore
import posthog from 'posthog-js'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '../helpers/withApollo'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import Head from 'next/head'
import useSession from '../helpers/useSession'
import SessionContext from '../helpers/contexts/session'
import '../scss/index.scss'

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, pageProps, apollo }: IProps) {
  const session = useSession()
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      posthog.init(process.env.POSTHOG_API_KEY, {
        api_host: 'https://app.posthog.com'
      })
    }
  }, [])
  return (
    <ApolloProvider client={apollo}>
      <SessionContext.Provider value={session}>
        <Head>
          <title>C0D3.com</title>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SessionContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
