import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

/* This URL is only used for development.
   This needs to be an environmental variable for production.
*/
const SERVER_URL = process.env.SERVER_URL

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: `${SERVER_URL}/graphql`,
      cache: new InMemoryCache().restore(initialState || {})
    })
)
