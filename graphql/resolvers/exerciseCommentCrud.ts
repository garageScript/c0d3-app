import { MutationAddExerciseCommentArgs } from '..'
import { Context } from '../../@types/helpers'
import prisma from '../../prisma'

export const addExerciseComment = async (
  _parent: void,
  { content, exerciseId, parentId, userPic }: MutationAddExerciseCommentArgs,
  context: Context
) => {
  const authorId = context.req.user?.id
  if (!authorId) throw new Error('User should be logged in')

  return prisma.exerciseComment.create({
    data: { authorId, content, exerciseId, parentId, userPic }
  })
}
