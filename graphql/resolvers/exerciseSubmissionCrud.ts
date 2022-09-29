import prisma from '../../prisma'

export const exerciseSubmissions = () => {
  return prisma.exerciseSubmission.findMany({
    include: {
      exercise: true,
      user: true
    }
  })
}
