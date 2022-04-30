import prisma from '../../prisma'

export const lessons = () => {
  return prisma.lesson.findMany({
    include: { challenges: { orderBy: { order: 'asc' } } },
    orderBy: {
      order: 'asc'
    }
  })
}
