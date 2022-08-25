import { Context } from '../@types/helpers'
import { isAdmin, isAdminOrThrow } from '../helpers/isAdmin'
import { withUserContainer } from './withUserContainer'
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

export const withAdminUserContainer =
  <Type, ArgsType>(
    resolver: (_parent: void, args: ArgsType, ctx: Context) => Type,
    errorMessage?: string
  ) =>
  async (_parent: void, args: ArgsType, ctx: Context) => {
    return withUserContainer(
      withAdminContainer(resolver, errorMessage && errorMessage)
    )(_parent, args, ctx)
  }
