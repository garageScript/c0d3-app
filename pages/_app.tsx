import React, { useEffect } from 'react'
// TODO: type the posthog library
// @ts-ignore
import posthog from 'posthog-js'
import withApollo from '../helpers/withApollo'
import {
  ApolloProvider,
  ApolloClient,
  NormalizedCacheObject
} from '@apollo/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../scss/index.scss'
import { MDXProvider } from '@mdx-js/react'
import CodeBlock from '../components/CodeBlock'
import Image from '../components/Image'
import BlockQuote from '../components/BlockQuote'

const MDXcomponents = {
  inlineCode: (props: any) => <div className="inlineCode" {...props} />,
  code: CodeBlock,
  blockquote: BlockQuote,
  img: Image,
  h1: (props: any) => <h1 className="MDX_h1" {...props} />,
  h2: (props: any) => <h2 className="MDX_h2" {...props} />,
  h3: (props: any) => <h3 className="MDX_h2" {...props} />,
  a: (props: any) => <a className="MDX_a" {...props} />,
  td: (props: any) => <td className="MDX_td" {...props} />,
  th: (props: any) => <th className="MDX_th" {...props} />
}

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
      <MDXProvider components={MDXcomponents}>
        <Head>
          {/* <!-- Primary Meta Tags --> */}
          <title>C0D3</title>
          <meta name="title" content="C0D3" />
          <meta
            name="description"
            content="Learn the foundations to be a full stack software engineer. 100% free."
          />
          <link rel="shortcut icon" href="/favicon.ico" />

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
        </Head>
        <Component {...pageProps} err={err} />
      </MDXProvider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
