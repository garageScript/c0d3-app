import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { prisma } from '../../prisma'

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

  const [lessonStatus, submissions, stars] = await Promise.all([
    prisma.userLesson.findMany({
      where: {
        userId
      }
    }),
    prisma.submission.findMany({
      where: {
        userId
      }
    }),
    prisma.star.findMany({
      where: {
        mentorId: userId
      }
    })
  ])

  // select Stars."lessonId",  Stars."studentId", Stars."mentorId", Users."username" FROM Stars INNER JOIN Lessons ON "lessonId" = Lessons."id" INNER JOIN Users ON "mentorId" = Users."id" WHERE "studentId" = {userId};
  const mentorIdsMap: mentorIdsMapType = stars.reduce(
    (map: mentorIdsMapType, star) => {
      const { lessonId, mentorId } = star
      map[lessonId!] = mentorId!
      return map
    },
    {}
  )

  const mentors = await prisma.user.findMany({
    where: { id: Object.values(mentorIdsMap) as number[] }
  })

  const mentorUsernamesMap: mentorUsernamesMapType = mentors.reduce(
    (map: mentorUsernamesMapType, mentor) => {
      const { id, username } = mentor
      map[id] = username
      return map
    },
    {}
  )

  lessonStatus.forEach(lesson => {
    const mentorId = mentorIdsMap[lesson.lessonId!]
    const username = mentorUsernamesMap[mentorId]
    lesson.starGiven = username
  })

  return {
    user,
    submissions,
    lessonStatus
  }
}
