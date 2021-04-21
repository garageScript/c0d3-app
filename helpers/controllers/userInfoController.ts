import type { Star } from '.prisma/client'
import _ from 'lodash'
import { UserInfoQueryVariables } from '../../graphql'
import { prisma } from '../../prisma'

type StarMap = {
  [lessonId: number]: Star[]
}

export const userInfo = async (_parent: void, args: UserInfoQueryVariables) => {
  const username = _.get(args, 'username')
  if (!username) {
    throw new Error('Invalid username')
  }
  const user = await prisma.user.findFirst({
    where: {
      username
    }
  })

  if (!user) {
    throw new Error('Invalid user object')
  }
  const [userLessons, submissions, stars] = await Promise.all([
    prisma.userLesson.findMany({
      where: {
        userId: user.id
      }
    }),
    prisma.submission.findMany({
      where: {
        userId: user.id
      }
    }),
    prisma.star.findMany({
      where: {
        mentorId: user.id
      },
      include: {
        student: {
          select: {
            username: true,
            name: true
          }
        },
        lesson: {
          select: {
            title: true,
            order: true
          }
        }
      }
    })
  ])

  const starMap = stars.reduce((map: StarMap, star) => {
    map[star.lessonId] = map[star.lessonId] || []
    map[star.lessonId].push(star)
    return map
  }, {})

  const lessonStatus = userLessons.map(userLesson => ({
    ...userLesson,
    starsReceived: starMap[userLesson.lessonId] || []
  }))

  return {
    user,
    lessonStatus,
    submissions
  }
}
