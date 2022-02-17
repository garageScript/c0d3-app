import prisma from '../../prisma'
import { MutationAddExerciseArgs, SuccessResponse } from '..'
import { Context } from '../../@types/helpers'
import type { Exercise } from '@prisma/client'
import { isAdminOrThrow } from '../../helpers/isAdmin'

export const exercises = async () => {
  return await prisma.exercise.findMany({
    include: {
      author: true,
      module: true
    }
  })
}

export const addExercise = async (
  _parent: void,
  args: MutationAddExerciseArgs,
  { req }: Context
): Promise<Exercise> => {
  isAdminOrThrow(req)
  const authorId = req.user?.id
  if (!authorId) throw new Error('No user')
  return prisma.exercise.create({
    data: { authorId, ...args }
  })
}

export const updateExercise = async (
  _parent: void,
  args: MutationAddExerciseArgs,
  { req }: Context
): Exercise => {
  const authorId = req.user?.id
  if (!authorId) throw new Error('No user')
}

export const deleteExercise = async (
  _parent: void,
  args: MutationAddExerciseArgs,
  { req }: Context
): SuccessResponse => {
  return { success: true }
}
