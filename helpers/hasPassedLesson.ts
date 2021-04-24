import { prisma } from '../prisma'

export const hasPassedLesson = async (
  reviewerId: number,
  lessonId: string
): Promise<Boolean> => {
  // query userlesson that belongs to lesson and user
  // TODO fix lessonId graphql typedef to Int
  const userLesson = await prisma.userLesson.findFirst({
    where: {
      lessonId: Number(lessonId),
      userId: reviewerId
    }
  })
  return userLesson ? Boolean(userLesson.isPassed) : false
}
