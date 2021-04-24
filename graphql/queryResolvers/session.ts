import _ from 'lodash'
import { userInfo } from '../../helpers/controllers/userInfoController'
import { Context } from '../../@types/helpers'
import { prisma } from '../../prisma'
import type { UserLesson } from '.prisma/client'

interface lessonMentorMapType {
  [lessonId: string]: string
}

export const session = async (_parent: void, _args: void, context: Context) => {
  const user = _.get(context, 'req.user', {})
  const userId = _.get(user, 'id', null)
  if (!user || !userId) return { lessonStatus: [] }

  // FYI: The reason we are querying with parallelized promises:
  // https://github.com/garageScript/c0d3-app/wiki/Sequelize-Query-Performance
  const [session, starsGiven] = await Promise.all([
    userInfo(_parent, { username: user.username }),
    prisma.star.findMany({
      where: {
        studentId: user.id
      },
      include: {
        lesson: {
          select: {
            id: true
          }
        },
        mentor: {
          select: {
            username: true
          }
        }
      }
    })
  ])

  const submissions = _.get(session, 'submissions', [])
  const userLessons = _.get(session, 'lessonStatus', [])

  const lessonMentorMap = starsGiven.reduce((map, starGiven) => {
    const mentorUsername = _.get(starGiven, 'mentor.username', '')
    map[starGiven.lessonId] = mentorUsername
    return map
  }, {} as lessonMentorMapType)

  const lessonStatus = userLessons.map((userLesson: UserLesson) => ({
    ...userLesson,
    starGiven: lessonMentorMap[userLesson.lessonId!] || ''
  }))

  return {
    user,
    lessonStatus,
    submissions
  }
}
