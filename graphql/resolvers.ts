import { login, logout, signup } from '../helpers/controllers/authController'
import db from '../helpers/dbload'

const { Lesson } = db

export default {
  Query: {
    lessons() {
      return Lesson.findAll({
        include: ['challenges'],
        order: [['order', 'ASC']]
      })
    },
    async session(_parent: any, _args: any, context: any) {
      const { user, submissions, lessonStatus } = context.req.session

      if (!user) {
        return null
      }

      return { user, submissions, lessonStatus }
    }
  },

  Mutation: {
    login,
    logout,
    signup
  }
}
