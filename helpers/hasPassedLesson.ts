import prisma from '../prisma'

export const hasPassedLesson = async (
  reviewerId: number,
  lessonId: number
): Promise<Boolean> => {
  const userLesson = await prisma.userLesson.findFirst({
    where: {
      lessonId: lessonId,
      userId: reviewerId
    }
  })
  return userLesson ? Boolean(userLesson.isPassed) : false
}
