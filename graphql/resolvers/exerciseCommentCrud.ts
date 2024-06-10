import {
  MutationAddExerciseCommentArgs,
  MutationEditExerciseCommentArgs,
  QueryGetExerciseCommentsArgs,
  QueryGetChildCommentsArgs
} from '..'
import { Context } from '../../@types/helpers'
import type { ExerciseComment } from '@prisma/client'
import { withUserContainer } from '../../containers/withUserContainer'
import prisma from '../../prisma'

export const getExerciseComments = async (
  _parent: void,
  { exerciseId }: QueryGetExerciseCommentsArgs
) => {
  return prisma.exerciseComment.findMany({
    where: { parentId: null, exerciseId },
    include: {
      replies: true,
      author: true
    }
  })
}

export const getChildComments = async (
  _parent: void,
  { parentId }: QueryGetChildCommentsArgs
) => {
  return prisma.exerciseComment.findMany({
    where: { parentId },
    include: {
      replies: true,
      author: true
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

export const editExerciseComment = withUserContainer<
  Promise<ExerciseComment>,
  MutationEditExerciseCommentArgs
>(
  async (
    _parent: void,
    { id, content }: MutationEditExerciseCommentArgs,
    context: Context
  ) => {
    const authorId = context.req.user?.id

    const exerciseComment = await prisma.exerciseComment.findUnique({
      where: {
        id
      }
    })

    if (exerciseComment?.authorId !== authorId)
      throw new Error('Comment is not by user')

    return prisma.exerciseComment.update({
      where: {
        id
      },
      data: { content }
    })
  }
)
