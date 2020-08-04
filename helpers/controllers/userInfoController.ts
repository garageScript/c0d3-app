import db from '../dbload'
import _ from 'lodash'

type Username = {
  username: string
}

const { User, UserLesson, Submission, Star } = db

export const userInfo = async (_parent: void, args: Username) => {
  const username = _.get(args, 'username')
  if (!username) {
    throw new Error('Invalid username')
  }
  const user = await User.findOne({
    where: {
      username
    }
  })

  if (!user) {
    throw new Error('Invalid user object')
  }
  const [lessonStatus, submissions, starsReceived] = await Promise.all([
    UserLesson.findAll({
      where: {
        userId: user.id
      }
    }),
    Submission.findAll({
      where: {
        userId: user.id
      }
    }),
    Star.findAll({
      where: {
        mentorId: user.id
      }
    })
  ])
  const starMap = starsReceived.reduce((map: any, star: any) => {
    map[star.lessonId] = map[star.lessonId]?.concat(star.dataValues) || [
      star.dataValues
    ]
    return map
  }, {})
  lessonStatus.forEach((lesson: any) => {
    lesson.starsReceived = starMap[lesson.lessonId] || []
  })

  return {
    user,
    lessonStatus,
    submissions
  }
}
