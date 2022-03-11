import prisma from '../../prisma'
import { QueryGetPreviousSubmissionsArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const getPreviousSubmissions = async (
  _parent: void,
  arg: QueryGetPreviousSubmissionsArgs,
  _ctx: Context
) => {
  const { challengeId, userId } = arg
  return prisma.submission.findMany({
    where: {
      challengeId,
      user: {
        id: userId
      }
    },
    include: {
      challenge: true,
      user: true,
      reviewer: true,
      comments: {
        include: {
          author: true
        }
      }
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
}
