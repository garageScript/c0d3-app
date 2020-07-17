import db from '../dbload'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { isAdmin } from '../isAdmin'

const { User } = db

type adminData = {
  username: string
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
    const { username, status } = arg

    if (!username) {
      throw new Error('Missing username')
    }

    await User.update(
      { isAdmin: status },
      {
        where: {
          username: username
        }
      }
    )

    return {
      success: true
    }
  } catch (err) {
    throw new Error(err)
  }
}
