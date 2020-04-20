import {
  login,
  logout,
  signup,
  deleteUser
} from '../helpers/controllers/authController'
import db from '../helpers/dbload'

const { Lesson, User } = db

export default {
  Query: {
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
    },
    user(_parent: any, _arg: any, ctx: any) {
      const {
        req: { session }
      } = ctx

      return session.userId
    }
  },

  Mutation: {
    login,
    logout,
    signup,
    deleteUser
  }
}
