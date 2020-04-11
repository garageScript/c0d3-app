import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApollo from '../helpers/withApollo'
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost'
import { AppProps } from 'next/app'
import '../scss/index.scss'

export const AuthUserContext = React.createContext<any>(null)

interface IProps extends AppProps {
  apollo: ApolloClient<NormalizedCacheObject>
}

function MyApp({ Component, pageProps, apollo }: IProps) {
  const [authUser, setAuthUser] = React.useState(null)

  return (
    <ApolloProvider client={apollo}>
      <AuthUserContext.Provider value={authUser}>
        <Component {...pageProps} setAuthUser={setAuthUser} />
      </AuthUserContext.Provider>
    </ApolloProvider>
  )
}

export default withApollo(MyApp)
