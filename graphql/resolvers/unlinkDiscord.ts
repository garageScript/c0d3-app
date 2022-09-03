import prisma from '../../prisma'
import { Context } from '../../@types/helpers'

export const unlinkDiscord = async (_parent: void, _: any, ctx: Context) => {
  const userId = ctx.req.user?.id

  if (!userId) throw new Error('Invalid user')

  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      discordAccessToken: '',
      discordAccessTokenExpires: null,
      discordId: '',
      discordRefreshToken: ''
    }
  })
}
