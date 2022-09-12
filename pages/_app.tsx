import React, { useEffect } from 'react'
// TODO: type the posthog library
// @ts-ignore
import posthog from 'posthog-js'
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject
} from '@apollo/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../scss/index.scss'
import { useApollo } from '../helpers/apolloClient'
import { ContextProvider } from '../helpers/globalContext'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { NextPageWithLayout } from '../@types/page'
interface IProps<P = Record<string, unknown>> extends AppProps {
  err: any
  apollo: ApolloClient<NormalizedCacheObject>
  Component: NextPageWithLayout
  pageProps: P & {
    session?: Session
  }
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  err
}: IProps) {
  const getLayout = Component.getLayout || (page => page)
  const apolloClient = useApollo(pageProps)
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_POSTHOG_API_KEY
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
        api_host: 'https://app.posthog.com'
      })
    }
  }, [])
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ApolloProvider client={apolloClient}>
        <ContextProvider>
          <Head>
            {/* <!-- Primary Meta Tags --> */}
            <meta name="title" content="C0D3" />
            <meta
              name="description"
              content="Learn the foundations to be a full stack software engineer. 100% free."
            />
            <link rel="shortcut icon" href="/favicon.ico" />

            {/* <!-- Google Search Console --> */}
            <meta
              name="google-site-verification"
              content="g3XwtRaZPgo2DxVzw7ujpH5L0I0jqAmD-D5ojAS3bag"
            />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.c0d3.com/" />
            <meta
              property="og:title"
              content="C0D3 — Learn Javascript the old school way"
            />
            <meta
              property="og:description"
              content="Learn the foundations to be a full stack software engineer. 100% free."
            />
            <meta
              property="og:image"
              content="https://www.c0d3.com/assets/c0d3-meta.svg"
            />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://www.c0d3.com/" />
            <meta
              property="twitter:title"
              content="C0D3 — Learn Javascript the old school way"
            />
            <meta
              property="twitter:description"
              content="Learn the foundations to be a full stack software engineer. 100% free."
            />
            <meta
              property="twitter:image"
              content="https://www.c0d3.com/assets/c0d3-meta.svg"
            />

            {/* <!-- Safari Web Content --> */}
            <meta name="apple-mobile-web-app-title" content="C0d3" />
          </Head>
          {getLayout(<Component {...pageProps} err={err} />, pageProps)}
        </ContextProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
