import { ApolloServer } from 'apollo-server-micro'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false // This is required for GraphQL to work properly  https://blog.logrocket.com/building-a-graphql-server-in-next-js/
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
