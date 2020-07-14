import db from '../../helpers/dbload'
import { Context } from '../../@types/helpers'

const { User, Submission, UserLesson } = db

type Submission = {
  lessonId: string
}

export const session = async (_parent: void, _args: void, context: Context) => {
  const { req } = context
  if (!req.user || !req.user.id) return null
  const userId = req.user.id

  // FYI: The reason we are querying with parallelized promises:
  // https://github.com/garageScript/c0d3-app/wiki/Sequelize-Query-Performance
  const [submissions, lessonStatus] = await Promise.all([
    Submission.findAll({
      where: { userId },
      include: [{ model: User, as: 'reviewer' }]
    }),
    UserLesson.findAll({ where: { userId } })
  ])

  return {
    user: req.user,
    submissions,
    lessonStatus
  }
}
