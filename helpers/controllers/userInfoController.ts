import type { Star } from '.prisma/client'
import _ from 'lodash'
import { UserInfoQueryVariables } from '../../graphql'
import { prisma } from '../../prisma'

interface lessonMentorMapType {
  [lessonId: string]: string
}

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
  const [userLessons, submissions, stars, starsGiven] = await Promise.all([
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
    }),
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

  const lessonMentorMap = starsGiven.reduce((map, starGiven) => {
    const mentorUsername = _.get(starGiven, 'mentor.username', '')
    map[starGiven.lessonId] = mentorUsername
    return map
  }, {} as lessonMentorMapType)

  const starMap = stars.reduce((map: StarMap, star) => {
    map[star.lessonId] = map[star.lessonId] || []
    map[star.lessonId].push(star)
    return map
  }, {})

  const lessonStatus = userLessons.map(userLesson => ({
    ...userLesson,
    starGiven: lessonMentorMap[userLesson.lessonId] || '',
    starsReceived: starMap[userLesson.lessonId] || []
  }))

  return {
    user,
    lessonStatus,
    submissions
  }
}
