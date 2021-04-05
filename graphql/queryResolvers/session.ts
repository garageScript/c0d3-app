import db from '../../helpers/dbload'
import { Context } from '../../@types/helpers'
import { User as UserType } from '../../helpers/models/User'
import { Star as StarType, LessonStatus } from '../../@types/lesson'
import _ from 'lodash'
const { User, Submission, UserLesson, Star } = db

type Submission = {
  lessonId: string
}
interface mentorUsernamesMapType {
  [userId: number]: string
}
interface mentorIdsMapType {
  [lessonId: string]: number
}

export const session = async (_parent: void, _args: void, context: Context) => {
  const user = _.get(context, 'req.user', {})
  const userId = _.get(user, 'id', null)
  if (!user || !userId) return { lessonStatus: [] }

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

  const mentorIdsMap: mentorIdsMapType = stars.reduce(
    (map: mentorIdsMapType, { dataValues }: { dataValues: StarType }) => {
      const { lessonId, mentorId } = dataValues
      map[lessonId] = mentorId
      return map
    },
    {}
  )

  const mentors = await User.findAll({
    where: { id: Object.values(mentorIdsMap) as number[] }
  })

  const mentorUsernamesMap: mentorUsernamesMapType = mentors.reduce(
    (map: mentorUsernamesMapType, { dataValues }: { dataValues: UserType }) => {
      const { id, username } = dataValues
      map[id] = username
      return map
    },
    {}
  )

  lessonStatus.forEach((lesson: LessonStatus) => {
    const mentorId = mentorIdsMap[lesson.lessonId]
    const username = mentorUsernamesMap[mentorId]
    lesson.starGiven = username
  })

  return {
    user,
    submissions,
    lessonStatus
  }
}
