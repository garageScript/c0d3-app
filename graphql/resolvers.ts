import { login, logout, signup } from '../helpers/controllers/authController'
import db from '../helpers/dbload'
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
    async session(_parent: any, _args: any, context: any) {
      const userId = _.get(context, 'req.session.userId', false)

      if (!userId) {
        return null
      }

      const user = await User.findOne({
        where: { id: userId },
        include: [ Submission, UserLesson ]
      })

      if (!user) {
        return null
      }

      return { 
        user,
        submissions: user.Submissions,
        lessonStatus: user.UserLessons
      }
    }
  },

  Mutation: {
    login,
    logout,
    signup
  }
}
