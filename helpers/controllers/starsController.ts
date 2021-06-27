import type { LoggedRequest } from '../../@types/helpers'
import type { SetStarMutation, SetStarMutationVariables } from '../../graphql'
import { prisma } from '../../prisma'
import { validateLessonId } from '../validateLessonId'
import { validateStudentId } from '../validation/validateStudentId'

export const setStar = async (
  _parent: void,
  arg: SetStarMutationVariables,
  ctx: { req: LoggedRequest }
): Promise<SetStarMutation['setStar']> => {
  const { req } = ctx
  try {
    const studentId = validateStudentId(req)
    const { lessonId, mentorId } = arg

    if (studentId === mentorId) {
      throw new Error('Unable to give star to yourself')
    }
    await validateLessonId(lessonId)
    const starData = { studentId, ...arg }

    await prisma.star.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId
        }
      },
      create: starData,
      update: starData,
      select: {
        lesson: {
          select: {
            chatUrl: true
          }
        },
        mentor: {
          select: {
            email: true
          }
        }
      }
    })

    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw new Error(err)
  }
}
