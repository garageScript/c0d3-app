import { validateLessonId } from '../../helpers/validateLessonId'
import { Context } from '../../@types/helpers'
import _ from 'lodash'
import { prisma } from '../../prisma'
import { LessonMentorsQuery, LessonMentorsQueryVariables } from '..'

export const getLessonMentors = async (
  _parent: void,
  { lessonId }: LessonMentorsQueryVariables,
  context: Context
): Promise<LessonMentorsQuery['getLessonMentors']> => {
  try {
    await validateLessonId(lessonId)
    const userId: number | undefined = _.get(context, 'req.user.id', undefined)
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
            isPassed: { not: null }
          }
        }
      },
      orderBy: {
        username: 'asc'
      }
    }) as any
  } catch (err) {
    throw new Error(err)
  }
}
