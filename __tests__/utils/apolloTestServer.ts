import { ApolloServer } from 'apollo-server-micro'
import resolvers from '../../graphql/resolvers'
import typeDefs from '../../graphql/typeDefs'

export const startServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
  })
}
