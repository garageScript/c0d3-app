import prisma from '../prisma'

export const hasPassedLesson = async (
  reviewerId: number,
  lessonId: number
): Promise<Boolean> => {
  const userLesson = await prisma.userLesson.findUnique({
    where: {
      lessonId_userId: {
        lessonId,
        userId: reviewerId
      }
    }
  })
  return Boolean(userLesson?.passedAt)
}
