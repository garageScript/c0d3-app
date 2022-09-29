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
      exercise: true,
      user: true
    },
    where: {
      user: {
        id: userId
      }
    }
  })
}
