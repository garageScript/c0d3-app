import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { schema } from '../graphql/schema'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { persistCache } from 'apollo3-cache-persist'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
let apolloClient: ApolloClient<NormalizedCacheObject>
const cache = new InMemoryCache()

if (typeof window !== 'undefined') {
  try {
    persistCache({
      cache,
      storage: window.localStorage
    })
  } catch (error) {
    console.error('Error restoring Apollo cache', error)
  }
}
function createIsomorphLink() {
  if (typeof window === 'undefined') {
    return new SchemaLink({ schema })
  } else {
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin'
    })
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache
  })
}

export function initializeApollo(initialState: NormalizedCacheObject = {}) {
  const _apolloClient = apolloClient || createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps && pageProps.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
