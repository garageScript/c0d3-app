import db from '../helpers/dbload'
import bcrypt from 'bcrypt'
import { Request } from 'express'
import { findLessons } from '../helpers/db/lesson'

const { Lesson, User, Challenge } = db

export default {
  Query: {
    // TODO: Update ctx value
    lessons: async (_parent: void, _arg: void, ctx: any) => {
      const userId = ctx.req.session ? ctx.req.session.userId : null
      const lessons = await findLessons(userId)
      return lessons
    },
    user: async (_parent: void, _arg: void, ctx: any) => {
      const { req } = ctx

      if (!req.session.userId) {
        return null
      }

      const user = await User.findOne({
        where: {
          id: req.session.userId
        },
        include: [
          {
            model: Lesson,
            include: [
              {
                model: Challenge,
                as: 'challenges'
              }
            ]
          }
        ]
      })

      if (!user) {
        return null
      }
      return user
    }
  },

  Mutation: {
    login: async (
      _parent: void,
      arg: { username: string; password: string },
      ctx: {
        req: Request
      }
    ) => {
      try {
        const {
          req: { session }
        } = ctx
        if (!session) {
          throw new Error('Session Error')
        }
        const { username, password } = arg
        const user = await User.findOne({ where: { username } })
        if (!user) {
          return {
            success: false,
            error: 'User does not exist'
          }
        }
        const validLogin = await bcrypt.compare(password, user.password)
        if (!validLogin) {
          return {
            success: false,
            error: 'Password is invalid'
          }
        }
        session.userId = user.id
        return {
          success: true,
          username: user.username
        }
      } catch (err) {
        return {
          success: false,
          error: err.message
        }
      }
    },
    logout: (
      _parent: void,
      _args: void,
      ctx: {
        req: Request
      }
    ) => {
      const { req } = ctx
      if (!req.session) {
        return {
          success: false,
          error: 'Session Error'
        }
      }
      req.session.destroy(err => {
        if (err) {
          return {
            success: false,
            error: err.message
          }
        }
        return {
          success: true
        }
      })
    }
  }
}
