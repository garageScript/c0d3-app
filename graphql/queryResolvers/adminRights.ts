import { Context } from '../../@types/helpers'
import { isAdmin } from '../../helpers/isAdmin'

export const adminRights = (_parent: void, _args: void, context: Context) => {
  const { req } = context
  return isAdmin(req)
}
