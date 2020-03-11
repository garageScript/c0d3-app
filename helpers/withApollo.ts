import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

/* This URL is only used for development.
   This needs to be an environmental variable for production.
*/
const URI = process.env.URI

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: `${URI}/graphql`,
      cache: new InMemoryCache().restore(initialState || {})
    })
)
