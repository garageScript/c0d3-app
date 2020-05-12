import db from '../dbload'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { signupValidation } from '../formValidation'
import { chatSignUp } from '../mattermost'
import { LoggedRequest } from '../../@types/helpers'

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
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const { session } = req
    const { username, password } = arg

    if (!session) {
      throw new Error('Session Error')
    }

    const user = await User.findOne({ where: { username } })
    if (!user) {
      throw new UserInputError('User does not exist')
    }

    const validLogin = await bcrypt.compare(password, user.password)
    if (!validLogin) {
      throw new AuthenticationError('Password is invalid')
    }

    session.userId = user.id
    return {
      success: true,
      username: user.username
    }
  } catch (err) {
    if (!err.extensions) {
      req.error(err)
    }
    throw new Error(err)
  }
}

export const logout = async (
  _parent: void,
  _: void,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  const { session } = req
  return new Promise(async (resolve, reject) => {
    if (!session) {
      return reject({
        success: false,
        error: 'Session Error'
      })
    }

    session.destroy(err => {
      if (err) {
        req.error(err)
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

export const signup = async (
  _parent: void,
  arg: SignUp,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const { firstName, lastName, username, password, email } = arg

    const validEntry = await signupValidation.isValid({
      firstName,
      lastName,
      username,
      password,
      email
    })

    if (!validEntry) {
      throw new UserInputError('Register form is not completely filled out')
    }

    // Check for existing user or email
    const existingUser = await User.findOne({
      where: {
        username
      }
    })

    if (existingUser) {
      throw new UserInputError('User already exists')
    }

    const existingEmail = await User.findOne({
      where: {
        email
      }
    })

    if (existingEmail) {
      throw new UserInputError('Email already exists')
    }

    const randomToken = nanoid()
    const name = `${firstName} ${lastName}`
    const hash = await bcrypt.hash(password, 10)

    // Chat Signup
    await chatSignUp(username, password, email)

    const userRecord = User.create({
      name,
      username,
      password: hash,
      email,
      emailVerificationToken: randomToken
    })

    return {
      username: userRecord.username
    }
  } catch (err) {
    if (!err.extensions) {
      req.error(err)
    }
    throw new Error(err)
  }
}
