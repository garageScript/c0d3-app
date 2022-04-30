import prisma from '../../prisma'
import { MutationDeleteCommentArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const deleteComment = async (
  _parent: void,
  arg: MutationDeleteCommentArgs,
  ctx: Context
) => {
  const { id } = arg

  const authorId = ctx.req.user?.id
  if (!authorId) throw new Error('No authorId field')

  const comment = await prisma.comment.findUnique({
    where: {
      id
    }
  })

  if (comment?.authorId !== authorId)
    throw new Error('Comment is not by the user')

  return prisma.comment.delete({
    where: {
      id
    }
  })
}
