import _ from 'lodash'
import {
  login,
  logout,
  signup,
  isTokenValid
} from '../helpers/controllers/authController'
import { addAlert, removeAlert } from '../helpers/controllers/alertController'
import db from '../helpers/dbload'
import { reqPwReset, changePw } from '../helpers/controllers/passwordController'
import {
  createSubmission,
  acceptSubmission,
  rejectSubmission,
  submissions
} from '../helpers/controllers/submissionController'
import { Context } from '../@types/helpers'

const { User, Submission, Lesson, UserLesson, Alert } = db

type Submission = {
  lessonId: string
}

export default {
  Query: {
    lessons() {
      return Lesson.findAll({
        include: ['challenges'],
        order: [
          ['order', 'ASC'],
          ['challenges', 'order', 'ASC']
        ]
      })
    },
    submissions,
    isTokenValid,
    async session(_parent: void, _args: void, context: Context) {
      const userId = _.get(context, 'req.session.userId', false)

      if (!userId) {
        return null
      }

      // FYI: The reason we are querying with parallelized promises:
      // https://github.com/garageScript/c0d3-app/wiki/Sequelize-Query-Performance
      const [user, submissions, lessonStatus] = await Promise.all([
        User.findOne({ where: { id: userId } }),
        Submission.findAll({
          where: { userId },
          include: [{ model: User, as: 'reviewer' }]
        }),
        UserLesson.findAll({ where: { userId } })
      ])

      if (!user) {
        return null
      }

      return {
        user,
        submissions,
        lessonStatus
      }
    },
    alerts() {
      return Alert.findAll()
    },
    async userInfo(_parent: void, args: any) {
      const username = _.get(args, 'username')
      if (!username) {
        return null
      }
      const user = await User.findOne({
        where: {
          username
        }
      })
      if (!user) {
        return null
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
      console.log('Lesson Status:', lessonStatus)
      return {
        user,
        lessonStatus,
        submissions
      }
    }
  },

  Mutation: {
    changePw,
    createSubmission,
    acceptSubmission,
    rejectSubmission,
    login,
    logout,
    signup,
    addAlert,
    removeAlert,
    reqPwReset
  }
}
