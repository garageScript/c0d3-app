import { login, logout } from '../helpers/controllers/authController'
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
              attributes: ['isPassed', 'isTeaching']
            }
          }
        ],
        order: [['order', 'ASC']]
      })
    }
  },

  Mutation: {
    login,
    logout
  }
}
