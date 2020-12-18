import db from '../../helpers/dbload'
import { Context } from '../../@types/helpers'
import { Star as StarType, LessonStatus } from '../../@types/lesson'
import _ from 'lodash'
const { User, Submission, UserLesson, Star } = db

type Submission = {
  lessonId: string
}

export const session = async (_parent: void, _args: void, context: Context) => {
  const user = _.get(context, 'req.user', {})
  const userId = user.id
  if (!userId) return null

  // FYI: The reason we are querying with parallelized promises:
  // https://github.com/garageScript/c0d3-app/wiki/Sequelize-Query-Performance
  const [submissions, lessonStatus, stars] = await Promise.all([
    Submission.findAll({
      where: { userId },
      include: [{ model: User, as: 'reviewer' }]
    }),
    UserLesson.findAll({ where: { userId } }),
    Star.findAll({ where: { studentId: userId } })
  ])

  const starMap = stars.reduce(
    (map: any, { dataValues }: { dataValues: StarType }) => {
      map[dataValues.lessonId] = dataValues
      return map
    },
    {}
  )

  lessonStatus.forEach((lesson: LessonStatus) => {
    lesson.starGiven = starMap[lesson.lessonId]
  })

  return {
    user,
    submissions,
    lessonStatus
  }
}
