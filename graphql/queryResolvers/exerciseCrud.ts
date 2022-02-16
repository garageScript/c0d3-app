import prisma from '../../prisma'
import { MutationAddExerciseArgs } from '..'
import { Context } from '../../@types/helpers'
import { Exercise } from '..'
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
  const { moduleId, description, answer, testable, testStr } = args
  return prisma.exercise.create({
    data: { authorId, moduleId, description, answer, testStr, testable }
  })
}
