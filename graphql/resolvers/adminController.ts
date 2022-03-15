import { Context } from '../../@types/helpers'
import { ChangeAdminRightsMutationVariables } from '../../graphql'
import prisma from '../../prisma'
import { isAdminOrThrow } from '../../helpers/isAdmin'

export const changeAdminRights = async (
  _parent: void,
  { id, status }: ChangeAdminRightsMutationVariables,
  { req }: Context
) => {
  isAdminOrThrow(req)
  await prisma.user.update({ where: { id }, data: { isAdmin: status } })
  return {
    success: true
  }
}
