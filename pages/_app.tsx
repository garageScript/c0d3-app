import * as React from 'react'
import { AppProps } from 'next/app'
import '../scss/index.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
