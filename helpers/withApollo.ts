import withApollo from 'next-with-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-boost'

const SERVER_URL = process.env.SERVER_URL

const link = createHttpLink({
  uri: `${SERVER_URL}/graphql`,
  credentials: 'include'
})

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      link
    })
)
