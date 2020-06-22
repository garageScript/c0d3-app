import db from '../dbload'
import _ from 'lodash'

type Username = {
  username: string
}

const { User, UserLesson, Submission } = db
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
  const [lessonStatus, submissions] = await Promise.all([
    UserLesson.findAll({
      where: {
        userId: user.id
      }
    }),
    Submission.findAll({
      where: {
        userId: user.id
      }
    })
  ])
  return {
    user,
    lessonStatus,
    submissions
  }
}
