import db from '../dbload'

const { Challenge, Lesson, User } = db
export const findLessons = async (id: string | null) => {
  let mappedLessons
  if (id) {
    const lessons = await Lesson.findAll({
      include: [
        {
          model: Challenge,
          as: 'challenges',
          order: [['order', 'ASC']]
        },
        {
          model: User,
          where: {
            id
          },
          include: [
            {
              model: Lesson
            }
          ]
        }
      ],
      order: [
        ['order', 'ASC'],
        ['challenges', 'order', 'ASC']
      ]
    })
    // TODO: Implement safe type checking
    mappedLessons = lessons.map((l: any) => {
      const lesson = l.toJSON()
      lesson.currentUser = {
        userLesson: {
          isEnrolled: lesson.Users[0].UserLesson.isEnrolled,
          isPassed: lesson.Users[0].UserLesson.isPassed,
          isTeaching: lesson.Users[0].UserLesson.isTeaching
        }
      }
      return lesson
    })
  } else {
    const lessons = await Lesson.findAll({
      include: ['challenges'],
      order: [
        ['order', 'ASC'],
        ['challenges', 'order', 'ASC']
      ]
    })
    // TODO: Implement Safe Type-checking
    mappedLessons = lessons.map((l: any) => {
      const lesson = l.toJSON()
      lesson.currentUser = {
        userLesson: {
          isTeaching: '',
          isPassed: ''
        }
      }
      return lesson
    })
  }
  return mappedLessons
}
