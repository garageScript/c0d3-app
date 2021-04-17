import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { prisma } from '../../prisma'

type mentor = {
  mentorId: number
  studentId: number
  lessonId: number
  username: string
}

interface mentorLessonIdUsernameMapType {
  [lessonId: string]: string
}

export const session = async (_parent: void, _args: void, context: Context) => {
  const user = _.get(context, 'req.user', {})
  const userId = _.get(user, 'id', null)
  if (!user || !userId) return { lessonStatus: [] }

  const [lessonStatus, submissions] = await Promise.all([
    prisma.userLesson.findMany({
      where: {
        userId
      }
    }),
    prisma.submission.findMany({
      where: {
        userId
      }
    })
  ])

  const starsGivenToMentorsByUser: mentor[] = await prisma.$queryRaw`
  select Stars."lessonId",  Stars."studentId", Stars."mentorId", Users."username" 
    FROM Stars 
    INNER JOIN Lessons ON "lessonId" = Lessons."id" 
    INNER JOIN Users ON "mentorId" = Users."id" 
    WHERE "studentId" = ${userId};`

  const mentorLessonIdUsernameMap = starsGivenToMentorsByUser.reduce(
    (mentorsMap, { lessonId, username }) => {
      mentorsMap[lessonId] = username
      return mentorsMap
    },
    {} as mentorLessonIdUsernameMapType
  )

  lessonStatus.forEach(lesson => {
    lesson.starGiven = mentorLessonIdUsernameMap[lesson.lessonId]
  })

  console.log('lessonStatus: ', lessonStatus)

  return {
    user,
    submissions,
    lessonStatus
  }
}
