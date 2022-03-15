import prisma from '../../prisma'
import { MutationAddCommentArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const addComment = async (
  _parent: void,
  arg: MutationAddCommentArgs,
  ctx: Context
) => {
  const { line, submissionId, fileName, content } = arg
  const authorId = ctx.req.user?.id
  if (!authorId) throw new Error('No authorId field')
  return prisma.comment.create({
    data: {
      line,
      submissionId,
      authorId,
      fileName,
      content
    }
  })
}
