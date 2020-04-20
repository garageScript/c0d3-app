import db from '../dbload'
import bcrypt from 'bcrypt'
import { Request } from 'express'

const { User } = db

export const login = async (
  _parent: void,
  arg: { username: string; password: string },
  ctx: { req: Request }
) => {
  const {
    req: { session }
  } = ctx
  const { username, password } = arg

  if (!session) {
    throw new Error('Session Error')
  }

  const user = await User.findOne({ where: { username } })
  if (!user) {
    return {
      success: false,
      error: 'user does not exist'
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
}

export const logout = async (_parent: void, _: void, ctx: { req: Request }) => {
  const {
    req: { session }
  } = ctx

  if (!session) {
    return {
      success: false,
      error: 'Session Error'
    }
  }

  return session.destroy(err => {
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
