import { LessonMentorsQuery, LessonMentorsQueryVariables } from '..'
import { Context } from '../../@types/helpers'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import prisma from '../../prisma'

export const getLessonMentors = async (
  _parent: void,
  { lessonId }: LessonMentorsQueryVariables,
  context: Context
): Promise<LessonMentorsQuery['getLessonMentors']> => {
  await validateLessonId(lessonId)
  const userId = context.req.user?.id
  return prisma.user.findMany({
    select: {
      username: true,
      name: true,
      id: true
    },
    where: {
      id: { not: userId },
      userLessons: {
        some: {
          lessonId,
          passedAt: { not: null }
        }
      }
    },
    orderBy: {
      username: 'asc'
    }
  })
}
