import { Request } from 'express'
import db from '../helpers/dbload'
import { login, logout, signup } from '../helpers/controllers/authController'
import _ from 'lodash'

const { User, Submission, UserLesson, Lesson } = db

export default {
  Query: {
    lessons() {
      return Lesson.findAll({
        include: ['challenges'],
        order: [['order', 'ASC']]
      })
    },
    async session(_parent: void, _args: void, context: { req: Request }) {
      const userId = _.get(context, 'req.session.userId', false)

      if (!userId) {
        return null
      }

      // https://github.com/garageScript/c0d3-app/wiki/Sequelize-Query-Performance

      const [user, submissions, lessonStatus] = await Promise.all([
        User.findOne({ where: { id: userId } }),
        Submission.findAll({ where: { userId } }),
        UserLesson.findAll({ where: { userId } })
      ])

      if (!user) {
        return null
      }

      return {
        user,
        submissions,
        lessonStatus
      }
    }
  },

  Mutation: {
    login,
    logout,
    signup
  }
}
