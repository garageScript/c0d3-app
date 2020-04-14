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
    user: (_parent: any, _arg: any, ctx: any) => {
      console.log('ctx', ctx)
      return 'Hello'
    }
  }
}
