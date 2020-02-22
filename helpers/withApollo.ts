import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: 'https://api.graphql.jobs/',
      cache: new InMemoryCache().restore(initialState || {})
    })
)
