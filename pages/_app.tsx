import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '../helpers/withApollo'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import useSession from '../helpers/useSession'
import SessionContext from '../helpers/contexts/session'
import '../scss/index.scss'

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, pageProps, apollo }: IProps) {
  const session = useSession()

  if (!session.data && !session.error) {
    return null
  }

  return (
    <ApolloProvider client={apollo}>
      <SessionContext.Provider value={session}>
        <Component {...pageProps} />
      </SessionContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
