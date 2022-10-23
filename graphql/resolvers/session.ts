import type { UserLesson } from '.prisma/client'
import { Context } from '../../@types/helpers'
import { userInfo } from './userInfoController'
import prisma from '../../prisma'

interface lessonMentorMapType {
  [lessonId: number]: string
}

export const session = async (_parent: void, _args: void, context: Context) => {
  const user = context?.req?.user
  if (!user) return { lessonStatus: [] }

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

  const {
    submissions,
    lessonStatus: userLessons,
    user: { discordUserId, discordAvatarUrl, discordUsername }
  } = session

  const userWithDiscordStatus = {
    ...user,
    discordUserId,
    discordAvatarUrl,
    discordUsername,
    isConnectedToDiscord: !!user.discordRefreshToken // using this to avoid a second fetch to get Discord username
  }

  const lessonMentorMap = starsGiven.reduce((map, { lessonId, mentor }) => {
    map[lessonId] = mentor.username
    return map
  }, {} as lessonMentorMapType)

  const lessonStatus = userLessons.map((userLesson: UserLesson) => ({
    ...userLesson,
    starGiven: lessonMentorMap[userLesson.lessonId!] || ''
  }))

  return {
    user: userWithDiscordStatus,
    lessonStatus,
    submissions
  }
}
