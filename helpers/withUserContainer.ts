import { Context } from '../@types/helpers'

export const withUserContainer =
  <Type, ArgsType>(
    resolver: (_parent: void, args: ArgsType, ctx: Context) => Type
  ) =>
  async (_parent: void, args: ArgsType, ctx: Context) => {
    const { req } = ctx

    const authorId = req.user?.id

    if (!authorId) throw new Error('No user')

    return resolver(_parent, args, ctx)
  }
