import prisma from '../../prisma'
import {
  MutationAddExerciseArgs,
  MutationUpdateExerciseArgs,
  MutationDeleteExerciseArgs
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
  const { testStr, description, answer, moduleId, explanation } = args
  return prisma.exercise.create({
    data: { authorId, testStr, description, answer, moduleId, explanation },
    include: {
      author: true,
      module: true
    }
  })
}

export const updateExercise = async (
  _parent: void,
  args: MutationUpdateExerciseArgs,
  { req }: Context
): Promise<Exercise> => {
  const authorId = req.user?.id
  if (!authorId) throw new Error('No user')
  const { id, testStr, description, answer, moduleId, explanation, flaggedAt } =
    args
  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    },
    include: {
      author: true,
      module: true
    }
  })
  if (!isAdmin(req) && exercise?.authorId !== authorId) {
    throw new Error('Not authorized to change')
  }
  return prisma.exercise.update({
    where: {
      id
    },
    data: { explanation, testStr, description, answer, moduleId, flaggedAt },
    include: {
      author: true,
      module: true
    }
  })
}

export const deleteExercise = async (
  _parent: void,
  arg: MutationDeleteExerciseArgs,
  { req }: Context
): Promise<Exercise> => {
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
  return prisma.exercise.delete({
    where: { id },
    include: {
      author: true,
      module: true
    }
  })
}
