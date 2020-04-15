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
    }
  }
}
