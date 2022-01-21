import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { schema } from '../graphql/schema'

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  })
}
