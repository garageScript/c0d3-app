import { Context } from '../@types/helpers'
import { isAdmin, isAdminOrThrow } from '../helpers/isAdmin'
import _ from 'lodash'

//use when only checking if user is admin
export const withAdminContainer =
  <Type, ArgsType>(
    resolver: (_parent: void, args: ArgsType, ctx: Context) => Type,
    errorMessage: string | undefined = undefined
  ) =>
  async (_parent: void, args: ArgsType, ctx: Context) => {
    const { req } = ctx

    //check if is admin
    if (errorMessage) {
      if (!isAdmin(req)) throw new Error(errorMessage)
    }

    isAdminOrThrow(req)

    return resolver(_parent, args, ctx)
  }

//use when checking if admin AND if user exists
export const withAdminUserContainer =
  <Type, ArgsType>(
    resolver: (_parent: void, args: ArgsType, ctx: Context) => Type,
    errorMessage: string | undefined = undefined
  ) =>
  async (_parent: void, args: ArgsType, ctx: Context) => {
    const { req } = ctx

    //check if user exists
    const authorId = _.get(req, 'user.id')
    if (!authorId) throw new Error('No user')

    //check if is admin
    if (errorMessage) {
      if (!isAdmin(req)) throw new Error(errorMessage)
    }

    isAdminOrThrow(req)

    return resolver(_parent, args, ctx)
  }
