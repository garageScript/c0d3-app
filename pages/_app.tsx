import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import withApollo from '../helpers/withApollo'
import useSWR from 'swr'
import '../scss/index.scss'

export const AuthUserContext = React.createContext<any>(null)

const SERVER_URL = process.env.SERVER_URL

export const fetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, pageProps, apollo }: IProps) {
  const { data, error } = useSWR(`${SERVER_URL}/session`, fetcher)

  // while loading, don't show anything to user
  if (!data && !error) {
    return <h1>Loading</h1>
  }

  return (
    <ApolloProvider client={apollo}>
      <AuthUserContext.Provider value={data && data.userInfo}>
        <Component {...pageProps} />
      </AuthUserContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
