import prisma from '../../prisma'
import { withAdminContainer } from '../../containers/withAdminContainer'

export const allUsers = withAdminContainer((_parent: void, _args: void) => {
  return prisma.user.findMany()
})
