import { AuthenticationError, UserInputError } from 'apollo-server-micro'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { Context } from '../../@types/helpers'
import { ReqPwResetMutation, ReqPwResetMutationVariables } from '../../graphql'
import prisma from '../../prisma'
import { decode, encode } from '../../helpers/encoding'
import findUser from '../../helpers/findUser'
import { passwordValidation } from '../../helpers/formValidation'
import { sendResetEmail } from '../../helpers/mail'

const THREE_DAYS = 1000 * 60 * 60 * 24 * 3

export const reqPwReset = async (
  _parent: void,
  arg: ReqPwResetMutationVariables,
  ctx: Context
): Promise<ReqPwResetMutation['reqPwReset']> => {
  const { req } = ctx
  const { userOrEmail } = arg

  let user = await findUser(userOrEmail)
  if (!user) {
    throw new UserInputError('User does not exist')
  }

  const forgotToken = encode({
    userId: user.id,
    userToken: nanoid()
  })
  const tokenExpiration = new Date(Date.now() + THREE_DAYS)

  user = await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      forgotToken,
      tokenExpiration
    }
  })

  try {
    await sendResetEmail(user.email, user.forgotToken!)
  } catch (error) {
    req.error(`
        Error while sending password recovery email
        ${JSON.stringify(error, null, 2)}
      `)
    throw Error(
      `Error while sending password recovery email, try again at some later time.`
    )
  }

  return { success: true }
}

export const changePw = async (
  _parent: void,
  args: {
    token: string
    password: string
  },
  ctx: Context
) => {
  const { req } = ctx
  if (!req.session) {
    throw new Error('Session does not exist')
  }

  const { password, token } = args
  const { userId } = decode(token)

  const validPw = await passwordValidation.isValid({ password })

  if (!validPw) {
    throw new UserInputError('Password does not meet criteria')
  }

  let user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw new AuthenticationError('User does not exist')
  }
  if (
    token !== user.forgotToken ||
    !user.tokenExpiration ||
    user.tokenExpiration < new Date()
  ) {
    throw new AuthenticationError('Invalid Token')
  }
  const hash = await bcrypt.hash(password, 10)
  user = await prisma.user.update({
    where: { id: user.id },
    data: {
      tokenExpiration: null,
      forgotToken: null,
      password: hash
    }
  })

  req.session.userId = user.id
  return {
    success: true
  }
}
