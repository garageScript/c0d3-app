import db from './dbload'

const { Lesson, User, Challenge } = db
export const findLessons = async () => {
  return Lesson.findAll({
    include: [
      {
        model: Challenge,
        as: 'challenges'
      },
      {
        model: User,
        through: {
          attributes: ['isPassed', 'isEnrolled', 'isTeaching']
        }
      }
    ],
    order: [['order', 'ASC']]
  })
}
