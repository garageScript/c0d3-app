import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'
import { ChangeAdminRightsMutationVariables } from '../../graphql'
import { prisma } from '../../prisma'

export const changeAdminRights = async (
  _parent: void,
  arg: ChangeAdminRightsMutationVariables,
  ctx: Context
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }

    const { id, status } = arg

    await prisma.user.update({ where: { id }, data: { isAdmin: status } })

    return {
      success: true
    }
  } catch (err) {
    throw new Error(err)
  }
}
