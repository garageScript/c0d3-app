import { Context } from '../../@types/helpers'
import { isAdminOrThrow } from '../../helpers/isAdmin'
import prisma from '../../prisma'

export const allUsers = (_parent: void, _args: void, { req }: Context) => {
  isAdminOrThrow(req)
  return prisma.user.findMany()
}
