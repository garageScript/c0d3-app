import _ from 'lodash'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { Request } from 'express'

import { publicChannelMessage } from '../helpers/mattermost'
import { login, logout, signup } from '../helpers/controllers/authController'
import db from '../helpers/dbload'

const { User, Submission, Lesson, UserLesson, Challenge } = db

type ArgsCreateSubmission = {
  lessonId: string
  cliToken: string
  diff: string
  challengeId: string
}

export default {
  Query: {
    lessons() {
      return Lesson.findAll({
        include: ['challenges'],
        order: [['order', 'ASC']]
      })
    },
    async session(_parent: void, _args: void, context: { req: Request }) {
      const userId = _.get(context, 'req.session.userId', false)

      if (!userId) {
        return null
      }

      // FYI: The reason we are querying with parallelized promises:
      // https://github.com/garageScript/c0d3-app/wiki/Sequelize-Query-Performance
      const [user, submissions, lessonStatus] = await Promise.all([
        User.findOne({ where: { id: userId } }),
        Submission.findAll({ where: { userId } }),
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
    async isTokenValid(_parent: void, args: { cliToken: string }) {
      const { cliToken } = args
      const user = await User.findOne({ where: { cliToken } })
      return Boolean(user)
    },
    async cliToken(
      _parent: void,
      args: { username: string; password: string }
    ) {
      try {
        const { username, password } = args
        const user = await User.findOne({ where: { username } })
        if (!user) throw 'Invalid username'

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw 'Invalid password'

        if (!user.cliToken) await user.update({ cliToken: nanoid() })

        return user.cliToken
      } catch (error) {
        throw new Error(error)
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
        const { username, id: userId } = await User.findOne({
          where: { cliToken }
        })
        const [submission] = await Submission.findOrCreate({
          where: { lessonId, challengeId, userId }
        })
        await submission.update({ diff, status: 'open', viewCount: 0 })
        const [challenge, lesson] = await Promise.all([
          Challenge.findByPk(challengeId),
          Lesson.findByPk(lessonId)
        ])
        const lessonName = lesson.chatUrl.split('/').pop()
        const message = `@${username} has submitted a solution **_${challenge.title}_**. Click [here](<https://c0d3.com/teacher/${lesson.id}>) to review the code.`
        publicChannelMessage(lessonName, message)
        return submission
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
