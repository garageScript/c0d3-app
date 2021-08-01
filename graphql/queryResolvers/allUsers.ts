import { Context } from '../../@types/helpers'
import { checkIsAdmin } from '../../helpers/isAdmin'
import prisma from '../../prisma'

export const allUsers = (_parent: void, _args: void, { req }: Context) => {
  checkIsAdmin(req)
  return prisma.user.findMany()
}
