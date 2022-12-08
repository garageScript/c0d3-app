import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import type { Context } from '../../@types/helpers'
import type {
  LoginMutationVariables,
  SignupMutationVariables
} from '../../graphql'
import prisma from '../../prisma'
import { decode, encode } from '../../helpers/encoding'
import { signupValidation } from '../../helpers/formValidation'
import { sendSignupEmail } from '../../helpers/mail'

const THREE_DAYS = 1000 * 60 * 60 * 24 * 3

export const login = async (_parent: void, arg: LoginMutationVariables) => {
  const { username, password } = arg

  let user = await prisma.user.findFirst({ where: { username } })
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
    user = await prisma.user.update({
      where: {
        id: user.id
      },
      data: { cliToken: nanoid() }
    })
  }

  const cliToken = { id: user.id, cliToken: user.cliToken }

  return {
    success: true,
    username: user.username,
    cliToken: encode(cliToken),
    id: user.id
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

export const signup = async (
  _parent: void,
  arg: SignupMutationVariables,
  ctx: Context
) => {
  const { req } = ctx
  const { firstName, lastName, username, email } = arg

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

  try {
    await sendSignupEmail(email, forgotToken)
  } catch (error) {
    req.error(`
        Error while sending signup email
        ${JSON.stringify(error, null, 2)}
      `)
  }

  return {
    success: true,
    username: newUser.username,
    cliToken: forgotToken,
    id: newUser.id
  }
}

export const isTokenValid = async (
  _parent: void,
  arg: { cliToken: string }
) => {
  const { id, cliToken } = decode(arg.cliToken)
  const user = await prisma.user.findUnique({ where: { id } })
  return user?.cliToken === cliToken || false
}
