import type { LoggedRequest } from '../../@types/helpers'
import type { SetStarMutation, SetStarMutationVariables } from '../../graphql'
import prisma from '../../prisma'
import { sendLessonChannelMessage } from '../../helpers/discordBot'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import { validateStudentId } from '../../helpers/validation/validateStudentId'

import { getDiscordMessageUserIdString } from '../../helpers/getDiscordMessageUserIdString'

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

    const { mentor } = await prisma.star.upsert({
      where: {
        studentId_lessonId: {
          studentId,
          lessonId
        }
      },
      create: starData,
      update: starData,
      select: {
        mentor: {
          select: {
            username: true,
            discordId: true
          }
        }
      }
    })

    await sendLessonChannelMessage(
      lessonId,
      `${getDiscordMessageUserIdString(mentor)} received a star!`
    )

    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw err
  }
}
