import { User } from '@prisma/client'
import { MutationUpdateUserNamesArgs } from '..'
import { withUserContainer } from '../../containers/withUserContainer'
import prisma from '../../prisma'

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
