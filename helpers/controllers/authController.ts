import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { signupValidation } from '../formValidation'
import { Context } from '../../@types/helpers'
import { encode, decode } from '../encoding'
import { sendSignupEmail } from '../mail'
import { prisma } from '../../prisma'

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
  const { req } = ctx
  const { session } = req
  return new Promise((resolve, reject) => {
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
    const existingUser = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (existingUser) {
      throw new UserInputError('User already exists')
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (existingEmail) {
      throw new UserInputError('Email already exists')
    }

    const name = `${firstName} ${lastName}`

    let newUser = await prisma.user.create({
      data: {
        name,
        username,
        email
      }
    })

    const forgotToken = encode({
      userId: newUser.id,
      userToken: nanoid()
    })

    const tokenExpiration = new Date(Date.now() + THREE_DAYS)

    newUser = await prisma.user.update({
      where: {
        id: newUser.id
      },
      data: {
        forgotToken,
        tokenExpiration
      }
    })

    await sendSignupEmail(email, forgotToken)

    return {
      success: true,
      username: newUser.username,
      cliToken: forgotToken
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
    const user = await prisma.user.findUnique({ where: { id } })
    return user ? user.cliToken === cliToken : false
  } catch (err) {
    throw new Error(err)
  }
}
