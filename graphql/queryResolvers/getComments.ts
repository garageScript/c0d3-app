import { prisma } from '../../prisma'
import { QueryGetCommentsArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const getComments = async (
  _parent: void,
  arg: QueryGetCommentsArgs,
  _ctx: Context
) => {
  const { line, challengeId, userId } = arg
  const comments = prisma.comment.findMany({
    where: {
      line: line,
      userId: userId,
      submissionId: challengeId
    },
    select: {
      content: true
    },
    orderBy: {
      order: 'asc'
    }
  })
  return comments
}
