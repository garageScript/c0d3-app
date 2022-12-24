import { User } from '@prisma/client'
import { MutationUpdateUserNamesArgs } from '..'
import { withUserContainer } from '../../containers/withUserContainer'
import prisma from '../../prisma'

export const updateUserNames = withUserContainer<
  Promise<User>,
  MutationUpdateUserNamesArgs
>(async (_, args, { req }) => {
  const { username, name } = args

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
