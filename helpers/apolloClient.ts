//from https://github.com/vercel/next.js/tree/canary/examples/with-apollo
import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
let apolloClient: ApolloClient<NormalizedCacheObject>
const cache = new InMemoryCache()

import { persistCache } from 'apollo3-cache-persist'
//restoring cache doesn't work with loading spinner, so it's enabled in page by page basis
const whiteList = ['/curriculum']

//there is no global await and this logic can't be refactored into other functions because pages/_app.tsx can't be async
;(async function () {
  if (whiteList.includes(window.location.pathname)) {
    try {
      await persistCache({
        cache,
        storage: window.localStorage
      })
    } catch (error) {
      console.error('Error restoring Apollo cache', error)
    }
  }
})()

function createHttpLink() {
  const { HttpLink } = require('@apollo/client/link/http')
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin'
  })
}

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    link: createHttpLink(),
    cache
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
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

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: Record<string, any>
) {
  if (pageProps && pageProps.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: Record<string, any>) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
