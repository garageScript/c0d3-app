import { prisma } from '../../prisma'
import { MutationAddCommentArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const addComment = async (
  _parent: void,
  arg: MutationAddCommentArgs,
  _ctx: Context
) => {
  const { line, submissionId, authorId, fileName, content } = arg
  const update = await prisma.comment.create({
    data: {
      line,
      submissionId,
      authorId,
      fileName,
      content
    }
  })
  return update
}
