import { findLessons } from '../helpers/controllers/lessonController'
import { login, logout } from '../helpers/controllers/authController'
import { Request } from 'express'

export default {
  Query: {
    lessons: async (_parent: void, _arg: void, ctx: { req: Request }) => {
      const userId = ctx.req.session ? ctx.req.session.userId : null
      const lessons = await findLessons(userId)
      return lessons
    }
  },

  Mutation: {
    login,
    logout
  }
}
