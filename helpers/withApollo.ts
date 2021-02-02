import withApollo from 'next-with-apollo'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const SERVER_URL = process.env.SERVER_URL

const link = createHttpLink({
  uri: SERVER_URL,
  credentials: 'include'
})

export default withApollo(
  ({ initialState }) =>
    new ApolloClient({
      // Cache is used to rehydrating the store for Server Side Rendering.
      // Apollo Explanation https://www.apollographql.com/docs/react/performance/server-side-rendering/
      // Example from : https://medium.com/swlh/create-a-killer-frontend-for-2020-setup-next-js-graphql-styled-components-typescript-and-ssr-fe66cffd7d94
      //next-with-appollo doesn't support apollo3 yet, so some types are not up to date
      //@ts-ignore
      cache: new InMemoryCache().restore(initialState || {}),
      link
    })
)
