import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '../helpers/withApollo'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import '../scss/index.scss'

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
