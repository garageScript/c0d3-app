import { User } from '@prisma/client'
import {
  MutationUpdateUserNamesArgs,
  MutationUpdateUserPasswordArgs,
  SuccessResponse
} from '..'
import { withUserContainer } from '../../containers/withUserContainer'
import prisma from '../../prisma'
import bcrypt from 'bcrypt'

export const updateUserNames = withUserContainer<
  Promise<User>,
  MutationUpdateUserNamesArgs
>(async (_, args, { req }) => {
  const { username, name } = args

  const usernameAlreadyUsed = await prisma.user.findFirst({
    where: {
      username
    }
  })

  if (usernameAlreadyUsed) {
    throw new Error('Username is already used')
  }

  const user = await prisma.user.update({
    where: {
      id: req.user!.id
    },
    data: {
      username,
      name
    }
  })

  return user
})

export const updateUserPassword = withUserContainer<
  Promise<SuccessResponse>,
  MutationUpdateUserPasswordArgs
>(async (_, args, { req }) => {
  const user = req.user!
  const { currentPassword, newPassword, newPasswordAgain } = args

  if (newPassword !== newPasswordAgain) {
    throw new Error("Passwords don't match")
  }

  const userFromDB = await prisma.user.findUnique({ where: { id: user.id } })

  const validLogin = userFromDB
    ? await bcrypt.compare(currentPassword, userFromDB.password as string)
    : false

  if (!validLogin) {
    throw new Error('Current password is invalid')
  }

  const hash = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      password: hash
    }
  })

  return { success: true }
})
