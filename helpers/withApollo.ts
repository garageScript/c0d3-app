import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const SERVER_URL = process.env.SERVER_URL

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: `${SERVER_URL}/graphql`,
      cache: new InMemoryCache().restore(initialState || {})
    })
)
