import { ApolloServer } from 'apollo-server-micro'
import nextConnect from 'next-connect'
import typeDefs from '../../graphql/typeDefs'
import resolvers from '../../graphql/resolvers'

const handler = nextConnect()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
})

export const config = {
  api: {
    bodyParser: false
  }
}

const graphQLHandler = apolloServer.createHandler({ path: '/api/graphql' })

handler.get('/api/graphql', graphQLHandler).post('/api/graphql', graphQLHandler)

export default handler
