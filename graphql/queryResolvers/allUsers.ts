import db from '../../helpers/dbload'
import { Context } from '../../@types/helpers'
import { isAdmin } from '../../helpers/isAdmin'
const { User } = db

export const allUsers = (_parent: void, _args: void, context: Context) => {
  const { req } = context
  return !isAdmin(req) ? null : User.findAll()
}
