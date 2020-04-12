import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import withApollo from '../helpers/withApollo'
import useSWR from 'swr'
import '../scss/index.scss'

export const AuthUserContext = React.createContext<any>(null)
export const RouterContext = React.createContext<any>({ route: '/' })

const SERVER_URL = process.env.SERVER_URL

const fetcher = (url: string): Promise<any> =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, router, pageProps, apollo }: IProps) {
  const { data, error } = useSWR(`${SERVER_URL}/session`, fetcher)

  // while loading, don't show anything to user
  if (!data && !error) {
    return <h1>Loading</h1>
  }

  return (
    <ApolloProvider client={apollo}>
      <RouterContext.Provider value={router}>
        <AuthUserContext.Provider value={data && data.userInfo}>
          <Component {...pageProps} />
        </AuthUserContext.Provider>
      </RouterContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
