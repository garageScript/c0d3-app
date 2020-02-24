import withApollo from 'next-with-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

/* This URL is only used for development. 
   This needs to be an environmental variable for production.
*/

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      uri: 'https://song.c0d3.com/graphql',
      cache: new InMemoryCache().restore(initialState || {})
    })
)
