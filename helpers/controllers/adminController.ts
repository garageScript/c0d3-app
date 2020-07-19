import db from '../dbload'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'

const { User } = db

type adminData = {
  id: number
  status: string
}

export const changeAdminRights = async (
  _parent: void,
  arg: adminData,
  ctx: Context
) => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }

    const { id, status } = arg

    await User.update({ isAdmin: status }, { where: { id } })

    return {
      success: true
    }
  } catch (err) {
    throw new Error(err)
  }
}
