import type { Submission } from '.prisma/client'
import {
  MutationAcceptSubmissionArgs,
  MutationRejectSubmissionArgs,
  SubmissionStatus
} from '../graphql'
import { prisma } from '../prisma'
import { sendLessonChannelMessage } from './discordBot'

type ArgsUpdateSubmission = (
  | MutationAcceptSubmissionArgs
  | MutationRejectSubmissionArgs
) & {
  reviewerId: number
  status: SubmissionStatus
}

export const updateSubmission = async (
  args: ArgsUpdateSubmission
): Promise<Submission> => {
  try {
    if (!args) throw new Error('Invalid args')
    const { id, comment, status, reviewerId, lessonId } = args
    const { user, lesson, ...submission } = await prisma.submission.update({
      where: { id },
      data: {
        reviewerId,
        status,
        comment
      },
      include: {
        user: true,
        reviewer: true,
        challenge: true,
        lesson: true
      }
    })

    const [lessonChallengeCount, passedLessonSubmissions, userLesson] =
      await Promise.all([
        prisma.challenge.count({ where: { lessonId } }),
        prisma.submission.count({
          where: { lessonId, userId: user.id, status: SubmissionStatus.Passed }
        }),
        prisma.userLesson.upsert({
          where: {
            lessonId_userId: {
              lessonId,
              userId: user.id
            }
          },
          create: {
            lessonId,
            userId: user.id
          },
          update: {}
        })
      ])

    // user is resubmitting to a lesson that he has already passed
    // or user has not passed all challenges in lesson
    // immediately return and do not proceed
    if (
      userLesson.isPassed ||
      lessonChallengeCount !== passedLessonSubmissions
    ) {
      return submission
    }

    // TODO: Add support for discord ids when oauth implementation is complete

    // Get next lesson
    const nextLesson = await prisma.lesson.findFirst({
      where: { order: lesson.order + 1 }
    })

    // Message in lesson channel on discord
    sendLessonChannelMessage(
      lesson.id,
      `Congratulations to **${user.username}** for passing and completing **_${lesson.title}_**! **${user.username}** is now a guardian angel for the students in this channel.`
    )

    // Message in lesson channel on discord if next lesson exists
    if (nextLesson?.id != null) {
      sendLessonChannelMessage(
        nextLesson.id,
        `We have a new student joining us! **${user.username}** just completed **_${lesson.title}_**!`
      )
    }

    // update and save user lesson data
    await prisma.userLesson.update({
      where: {
        lessonId_userId: {
          lessonId,
          userId: user.id
        }
      },
      data: {
        isPassed: Date.now().toString()
      }
    })

    return submission
  } catch (error) {
    throw new Error(error)
  }
}
