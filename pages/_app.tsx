import * as React from 'react'
import { AppProps } from 'next/app'
import '../scss/index.scss'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '../utils/withApollo'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, pageProps, apollo }: IProps) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
