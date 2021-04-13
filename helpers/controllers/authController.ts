import db from '../dbload'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { signupValidation } from '../formValidation'
import { chatSignUp } from '../mattermost'
import { Context } from '../../@types/helpers'
import { encode, decode } from '../encoding'
import { sendSignupEmail } from '../mail'
import { prisma } from '../../prisma'

const { User } = db
const THREE_DAYS = 1000 * 60 * 60 * 24 * 3

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

export const login = async (_parent: void, arg: Login, ctx: Context) => {
  const { req } = ctx
  try {
    const { session } = req
    const { username, password } = arg

    if (!session) {
      throw new Error('Session Error')
    }

    const user = await prisma.user.findFirst({ where: { username } })
    // TODO change username column to be unique
    // const user = await prisma.user.findUnique({ where: { username } })
    if (!user) {
      throw new UserInputError('User does not exist')
    }

    const validLogin = user.password
      ? await bcrypt.compare(password, user.password)
      : false
    if (!validLogin) {
      throw new AuthenticationError('Password is invalid')
    }

    if (!user.cliToken) {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: { cliToken: nanoid() }
      })
    }

    const cliToken = { id: user.id, cliToken: user.cliToken }

    session.userId = user.id
    return {
      success: true,
      username: user.username,
      cliToken: encode(cliToken)
    }
  } catch (err) {
    if (!err.extensions) {
      req.error(err)
    }
    throw new Error(err)
  }
}

export const logout = async (_parent: void, _: void, ctx: Context) => {
  const { req, res } = ctx
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
      res.setHeader(
        'Set-Cookie',
        `connect.sid=; expires=${new Date(0)}; Path=/`
      )

      resolve({
        success: true
      })
    })
  })
}

export const signup = async (_parent: void, arg: SignUp, ctx: Context) => {
  const { req } = ctx
  try {
    const { session } = req
    const { firstName, lastName, username, email } = arg

    if (!session) {
      throw new Error('Session Error')
    }

    const validEntry = await signupValidation.isValid({
      firstName,
      lastName,
      username,
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

    const name = `${firstName} ${lastName}`
    const password = nanoid() // Placeholder for Mattermost
    // Chat Signup
    await chatSignUp(username, password, email)

    const userRecord = await User.create({
      name,
      username,
      email
    })

    const encodedToken = encode({
      userId: userRecord.id,
      userToken: nanoid()
    })

    userRecord.forgotToken = encodedToken
    userRecord.tokenExpiration = new Date(Date.now() + THREE_DAYS)
    await userRecord.save()

    sendSignupEmail(email, encodedToken)

    return {
      success: true,
      username: userRecord.username
    }
  } catch (err) {
    if (!err.extensions) {
      req.error(err)
    }
    throw new Error(err)
  }
}

export const isTokenValid = async (
  _parent: void,
  arg: { cliToken: string }
) => {
  try {
    const { id, cliToken } = decode(arg.cliToken)
    const user = await User.findByPk(id)

    return user.cliToken === cliToken
  } catch (err) {
    throw new Error(err)
  }
}
