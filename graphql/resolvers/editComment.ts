import prisma from '../../prisma'
import { MutationEditCommentArgs } from '../index'
import { Context } from '../../@types/helpers'
import type { Comment } from '@prisma/client'
import { withUserContainer } from '../../containers/withUserContainer'
import _ from 'lodash'

export const editComment = withUserContainer<
  Promise<Comment>,
  MutationEditCommentArgs
>(async (_parent: void, args: MutationEditCommentArgs, ctx: Context) => {
  const { id, content } = args
  const { req } = ctx
  const authorId = _.get(req, 'user.id')

  const comment = await prisma.comment.findUnique({
    where: {
      id
    }
  })

  if (_.get(comment, 'authorId') !== authorId)
    throw new Error('Comment is not by the user')

  return prisma.comment.update({
    where: {
      id
    },
    data: { content }
  })
})
