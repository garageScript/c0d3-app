import { MutationAddExerciseSubmissionArgs } from '..'
import { Context } from '../../@types/helpers'
import prisma from '../../prisma'

export const exerciseSubmissions = (
  _parent: void,
  _args: void,
  context: Context
) => {
  const userId = context.req.user?.id
  if (!userId) return []

  return prisma.exerciseSubmission.findMany({
    where: { userId }
  })
}

export const addExerciseSubmission = async (
  _parent: void,
  { exerciseId, userAnswer }: MutationAddExerciseSubmissionArgs,
  context: Context
) => {
  const userId = context.req.user?.id
  if (!userId) throw new Error('User should be logged in.')

  const exerciseSubmission = await prisma.exerciseSubmission.findFirst({
    where: { userId, exerciseId }
  })

  if (exerciseSubmission) {
    return prisma.exerciseSubmission.update({
      data: { exerciseId, userId, userAnswer },
      where: { id: exerciseSubmission.id }
    })
  }

  return prisma.exerciseSubmission.create({
    data: { exerciseId, userId, userAnswer }
  })
}
