import type { LoggedRequest } from '../../@types/helpers'
import type { SetStarMutation, SetStarMutationVariables } from '../../graphql'
import { prisma } from '../../prisma'
import { getUserByEmail, publicChannelMessage } from '../mattermost'
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

    const { lesson, mentor } = await prisma.star.upsert({
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

    if (lesson.chatUrl && mentor.email) {
      const channelName = lesson.chatUrl.split('/').pop()!
      const { username } = await getUserByEmail(mentor.email)
      publicChannelMessage(channelName, `@${username} received a star!`)
    }

    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw new Error(err)
  }
}
