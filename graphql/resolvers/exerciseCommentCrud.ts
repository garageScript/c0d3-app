import { MutationAddExerciseCommentArgs } from '..'
import { Context } from '../../@types/helpers'
import prisma from '../../prisma'

export const getExerciseComments = async (
  _parent: void,
  _args: { exerciseId: number }
) => {
  const exerciseId = _args.exerciseId
  return prisma.exerciseComment.findMany({
    where: { parentId: null, exerciseId },
    include: {
      replies: true
    }
  })
}

export const getChildComments = async (
  _parent: void,
  _args: { parentId: number }
) => {
  const parentId = _args.parentId
  return prisma.exerciseComment.findMany({
    where: { parentId },
    include: {
      replies: true
    }
  })
}

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
