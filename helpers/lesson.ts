import db from './dbload'

const { Lesson, User } = db
export const findLessons = async (id: string) => {
  return Lesson.findAll({
    include: [
      'challenges',
      {
        model: User,
        through: {
          attributes: ['isPassed', 'isEnrolled', 'isTeaching'],
          where: {
            id
          }
        }
      }
    ],
    order: [['order', 'ASC']]
  })
}
