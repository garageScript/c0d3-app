import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { schema } from '../graphql/schema'

function createApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  return createApolloClient()
}
