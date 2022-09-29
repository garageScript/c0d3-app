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
    include: {
      exercise: { include: { module: { include: { lesson: true } } } },
      user: true
    },
    where: { user: { id: userId } }
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
      where: { id: exerciseSubmission.id },
      include: { exercise: true, user: true }
    })
  }

  return prisma.exerciseSubmission.create({
    data: { exerciseId, userId, userAnswer },
    include: { exercise: true, user: true }
  })
}
