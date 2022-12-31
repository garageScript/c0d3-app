import prisma from '../../prisma'
import {
  MutationAddExerciseArgs,
  MutationUpdateExerciseArgs,
  MutationDeleteExerciseArgs,
  MutationFlagExerciseArgs,
  MutationRemoveExerciseFlagArgs,
  MutationRemoveExerciseArgs
} from '..'
import { Context } from '../../@types/helpers'
import type { Exercise } from '@prisma/client'
import { isAdmin } from '../../helpers/isAdmin'
import { get } from 'lodash'
import { withUserContainer } from '../../containers/withUserContainer'
import { withAdminUserContainer } from '../../containers/withAdminContainer'

export const exercises = () => {
  return prisma.exercise.findMany({
    include: {
      author: true,
      module: {
        include: { lesson: true }
      }
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

export const updateExercise = withUserContainer<
  Promise<Exercise>,
  MutationUpdateExerciseArgs
>(async (_parent: void, args: MutationUpdateExerciseArgs, ctx: Context) => {
  const { req } = ctx
  const { id, testStr, description, answer, moduleId, explanation } = args

  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    },
    include: {
      author: true,
      module: true
    }
  })
  const authorId = req.user?.id

  if (!isAdmin(req) && exercise?.authorId !== authorId)
    throw new Error('Not authorized to change')

  return prisma.exercise.update({
    where: {
      id
    },
    data: { explanation, testStr, description, answer, moduleId },
    include: {
      author: true,
      module: true
    }
  })
})

// will be removed in a following PR
export const deleteExercise = withUserContainer<
  Promise<Exercise>,
  MutationDeleteExerciseArgs
>(async (_parent: void, args: MutationDeleteExerciseArgs, ctx: Context) => {
  const { req } = ctx
  const { id } = args
  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    }
  })

  const authorId = req.user?.id

  if (!isAdmin(req) && exercise?.authorId !== authorId)
    throw new Error('Not authorized to delete')

  return prisma.exercise.delete({
    where: { id },
    include: {
      author: true,
      module: true
    }
  })
})

// replaces deleteExercise
export const removeExercise = withUserContainer<
  Promise<Exercise>,
  MutationRemoveExerciseArgs
>(async (_parent: void, args: MutationRemoveExerciseArgs, ctx: Context) => {
  const { req } = ctx
  const { id } = args

  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    }
  })

  const authorId = req.user?.id

  if (!isAdmin(req) && exercise?.authorId !== authorId) {
    throw new Error('Not authorized to remove')
  }

  if (exercise?.removed) {
    throw new Error('Exercise is already removed')
  }

  return prisma.exercise.update({
    where: { id },
    data: {
      removed: true
    },
    include: {
      author: true,
      module: true
    }
  })
})

export const flagExercise = withUserContainer<
  Promise<Exercise>,
  MutationFlagExerciseArgs
>(async (_parent: void, args: MutationFlagExerciseArgs, ctx: Context) => {
  const { req } = ctx
  const { id, flagReason } = args

  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    }
  })

  if (get(exercise, 'flaggedAt')) throw new Error('Exercise is already flagged')

  const flaggedById = get(req, 'user.id')
  return prisma.exercise.update({
    where: { id },
    data: {
      flaggedAt: new Date().toISOString(),
      flaggedById,
      flagReason
    },
    include: {
      author: true,
      module: true
    }
  })
})

export const removeExerciseFlag = withAdminUserContainer<
  Promise<Exercise>,
  MutationRemoveExerciseFlagArgs
>(async (_parent: void, arg) => {
  const { id } = arg

  const exercise = await prisma.exercise.findUnique({
    where: {
      id
    }
  })

  if (!get(exercise, 'flaggedAt'))
    throw new Error('Exercise is already not flagged')

  return prisma.exercise.update({
    where: { id },
    data: {
      flaggedAt: null,
      flaggedById: null,
      flagReason: null
    },
    include: {
      author: true,
      module: true
    }
  })
}, 'Not authorized to unflag')
