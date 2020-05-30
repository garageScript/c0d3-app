import _ from 'lodash'
import { Request } from 'express'

import { getUserByEmail, publicChannelMessage } from '../helpers/mattermost'
import {
  login,
  logout,
  signup,
  isTokenValid
} from '../helpers/controllers/authController'
import db from '../helpers/dbload'
import { decode } from '../helpers/encoding'

const { User, Submission, Lesson, UserLesson, Challenge } = db

type ArgsCreateSubmission = {
  lessonId: string
  cliToken: string
  diff: string
  challengeId: string
}

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
    submissions(_parent: void, arg: Submission, _context: { req: Request }) {
      const { lessonId } = arg
      return Submission.findAll({
        where: {
          status: 'open',
          lessonId
        }
      })
    },
    isTokenValid,
    async session(_parent: void, _args: void, context: { req: Request }) {
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
    }
  },

  Mutation: {
    login,
    logout,
    signup,
    createSubmission: async (
      _parent: void,
      args: ArgsCreateSubmission
    ): Promise<any> => {
      try {
        if (!args) throw new Error('Invalid args')
        const { challengeId, cliToken, diff, lessonId } = args
        const { id } = decode(cliToken)
        const { email, id: userId } = await User.findByPk(id)
        const [submission] = await Submission.findOrCreate({
          where: { lessonId, challengeId, userId }
        })
        await submission.update({ diff, status: 'open', viewCount: 0 })
        const [challenge, lesson] = await Promise.all([
          Challenge.findByPk(challengeId),
          Lesson.findByPk(lessonId)
        ])
        const lessonName = lesson.chatUrl.split('/').pop()
        const username = await getUserByEmail(email)
        const message = `@${username} has submitted a solution **_${challenge.title}_**. Click [here](<https://c0d3.com/teacher/${lesson.id}>) to review the code.`
        publicChannelMessage(lessonName, message)
        return submission
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
