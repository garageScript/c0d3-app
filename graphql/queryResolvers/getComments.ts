import { prisma } from '../../prisma'
import { QueryGetCommentsArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const getComments = async (
  _parent: void,
  arg: QueryGetCommentsArgs,
  _ctx: Context
) => {
  const { submissionId, fileName } = arg
  const comments = await prisma.comment.findMany({
    where: {
      submissionId,
      fileName
    },
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      author: true
    }
  })
  return comments
}
