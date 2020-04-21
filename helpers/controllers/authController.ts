import db from '../dbload'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { Request } from 'express'
import { signupValidation } from '../formValidation'

const { User } = db

type Login = {
  username: string
  password: string
}

type SignUp = {
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
}

export const login = async (
  _parent: void,
  arg: Login,
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
  return new Promise(async (resolve, reject) => {
    const {
      req: { session }
    } = ctx

    if (!session) {
      return reject({
        success: false,
        error: 'Session Error'
      })
    }

    session.destroy(err => {
      if (err) {
        reject({
          success: false,
          error: err.message
        })
      }

      resolve({
        success: true
      })
    })
  })
}

export const signup = async (_parent: void, arg: SignUp) => {
  const { firstName, lastName, username, password, email } = arg

  const validEntry = await signupValidation.isValid({
    firstName,
    lastName,
    username,
    password,
    email
  })

  if (!validEntry) {
    return {
      success: false,
      error: 'Invalid registration information'
    }
  }

  // Check for existing user or email
  const existingUser = await User.findOne({
    where: {
      username
    }
  })

  if (existingUser) {
    return {
      success: false,
      error: 'User already exists'
    }
  }

  const existingEmail = await User.findOne({
    where: {
      email
    }
  })

  if (existingEmail) {
    return {
      success: false,
      error: 'Email already exists'
    }
  }

  const randomToken = nanoid()
  const name = `${firstName} ${lastName}`
  const hash = await bcrypt.hash(password, 10)

  const userRecord = User.create({
    name,
    username,
    password: hash,
    email,
    emailVerificationToken: randomToken
  })

  return {
    success: true,
    username: userRecord.username
  }
}

export const deleteUser = async (
  _parent: void,
  arg: {
    userId: string
  }
) => {
  // This function should only be run for testing
  if (process.env.NODE_ENV === 'production') {
    return {
      success: false,
      error: 'Cannot run in production'
    }
  }
  const { userId } = arg

  try {
    await User.destroy({
      where: {
        id: userId
      }
    })

    return {
      success: true
    }
  } catch (e) {
    return {
      success: false,
      error: 'User does not exist'
    }
  }
}
