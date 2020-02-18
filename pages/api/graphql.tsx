import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    username: String
    hello: String
  }
`

const resolvers = {
  Query: {
    username(_parent: any, _args: any, ctx: any) {
      return ctx.user
    },
    hello() {
      return 'hello'
    }
  }
}

const context = ({ req }: { req: any }) => req.cookies

const apolloServer = new ApolloServer({ typeDefs, resolvers, context })

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
