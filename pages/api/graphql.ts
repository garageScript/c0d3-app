import { ApolloServer } from 'apollo-server-micro'
import typeDefs from '../../graphql/typeDefs'
import db from '../../helpers/dbload'

const { Lesson, User } = db

const resolvers = {
  Query: {
    hello() {
      return 'Hello'
    },
    lessons() {
      return Lesson.findAll({
        include: [
          'challenges',
          {
            model: User,
            through: {
              attributes: ['isPassed', 'isTeaching', 'isEnrolled']
            }
          }
        ],
        order: [['order', 'ASC']]
      })
    }
  }
}
const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
