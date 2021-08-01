import prisma from '../prisma'

export const validateLessonId = async (
  id: number,
  errMsg?: string
): Promise<true> => {
  const lesson = await prisma.lesson.findUnique({ where: { id } })
  if (lesson !== null) {
    return true
  }
  throw new Error(errMsg || 'lessonId does not exist in database')
}
