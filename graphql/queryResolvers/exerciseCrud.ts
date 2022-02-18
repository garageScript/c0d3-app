import prisma from '../../prisma'
import {
  MutationAddExerciseArgs,
  MutationUpdateExerciseArgs,
  MutationDeleteExerciseArgs,
  SuccessResponse
} from '..'
import { Context } from '../../@types/helpers'
import type { Exercise } from '@prisma/client'
import { isAdmin } from '../../helpers/isAdmin'

export const exercises = () => {
  return prisma.exercise.findMany({
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
  const authorId = req.user?.id
  if (!authorId) throw new Error('No user')
  const { testable, testStr, description, answer, moduleId } = args
  if (testable && !testStr) throw new Error('Testable must have test string')
  return prisma.exercise.create({
    data: { authorId, testable, testStr, description, answer, moduleId }
  })
}

export const updateExercise = async (
  _parent: void,
  args: MutationUpdateExerciseArgs,
  { req }: Context
): Promise<Exercise> => {
  const authorId = req.user?.id
  if (!authorId) throw new Error('No user')
  const { id, testable, testStr, description, answer, moduleId } = args
  if (testable && !testStr) throw new Error('Testable must have test string')
  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    }
  })
  if (!isAdmin(req) && exercise?.authorId !== authorId) {
    throw new Error('Not authorized to change')
  }
  return prisma.exercise.update({
    where: {
      id
    },
    data: { testable, testStr, description, answer, moduleId }
  })
}

export const deleteExercise = async (
  _parent: void,
  arg: MutationDeleteExerciseArgs,
  { req }: Context
): Promise<SuccessResponse> => {
  const { id } = arg
  const authorId = req.user?.id
  if (!authorId) throw new Error('No User')
  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    }
  })
  if (!isAdmin(req) && exercise?.authorId !== authorId) {
    throw new Error('Not authorized to delete')
  }
  await prisma.exercise.delete({ where: { id } })
  return { success: true }
}
