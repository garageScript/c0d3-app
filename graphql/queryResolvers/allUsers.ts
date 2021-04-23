import { Context } from '../../@types/helpers'
import { isAdmin } from '../../helpers/isAdmin'
import { prisma } from '../../prisma'

export const allUsers = (_parent: void, _args: void, context: Context) => {
  const { req } = context
  return !isAdmin(req) ? null : prisma.user.findMany()
}
