import { prisma } from '../../prisma'
import { MutationAddCommentArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const addComment = async (
  _parent: void,
  arg: MutationAddCommentArgs,
  _ctx: Context
) => {
  console.log('firing...')
  const { line, submissionId, userId, content } = arg
  const update = await prisma.comment.create({
    data: {
      line,
      submissionId,
      userId,
      content,
      order: 2
    }
  })
  console.log(update, 'updated comment')
  return update
}
