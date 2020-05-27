import db from '../dbload'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import { changeChatPassword } from '../mattermost'
import { Context } from '../../@types/helpers'
import { sendResetEmail } from '../mail'

const { User } = db
const THREE_DAYS = 1000 * 60 * 60 * 24 * 3

export const reqPwReset = async (
  _: void,
  arg: { userOrEmail: string },
  ctx: Context
) => {
  const { req } = ctx
  const { session } = req
  try {
    if (!session) {
      throw new Error('Session is not valid')
    }

    const { userOrEmail } = arg
    if (!userOrEmail) {
      throw new UserInputError('Please provider username or email')
    }

    let user: any
    if (userOrEmail.indexOf('@') !== -1) {
      user = await User.findOne({
        where: { email: userOrEmail }
      })
    } else {
      user = await User.findOne({
        where: { username: userOrEmail }
      })
    }

    if (!user) {
      throw new UserInputError('The User does not exist')
    }

    const encodedToken = JSON.stringify({
      userId: user.id,
      userToken: nanoid()
    })

    user.forgotToken = Buffer.from(encodedToken).toString('base64')
    user.expiration = new Date(Date.now() + THREE_DAYS)
    await user.save()
    sendResetEmail(user.email, user.forgotToken)

    return { success: true, token: user.forgotToken }
  } catch (err) {
    if (!err.extensions) {
      req.error(err)
    }
    throw new Error(err)
  }
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
  const { session } = req
  try {
    if (!session) {
      throw new Error('no session')
    }

    const { password, token } = args
    const buff = new Buffer(token, 'base64')
    const { userId } = JSON.parse(buff.toString('ascii'))
    const user = await User.findByPk(userId)
    if (!user) {
      throw new AuthenticationError('User does not exist')
    }
    if (token !== user.forgotToken || Date.now() > user.expiration) {
      throw new AuthenticationError('Invalid Forgot Token')
    }
    const hash = await bcrypt.hash(password, 10)
    user.expiration = null
    user.forgotToken = null
    user.password = hash
    await user.save()

    if (!changeChatPassword(user.email, password)) {
      throw new Error('Mattermost password was not set')
    }

    return {
      success: true
    }
  } catch (err) {
    if (!err.extensions) {
      req.error(err)
    }
    throw new Error(err)
  }
}
