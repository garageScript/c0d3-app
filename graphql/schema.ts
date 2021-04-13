import { makeExecutableSchema } from 'apollo-server-micro'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
