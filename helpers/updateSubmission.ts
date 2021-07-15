import type { Challenge, Submission, User } from '.prisma/client'
import {
  MutationAcceptSubmissionArgs,
  MutationRejectSubmissionArgs,
  SubmissionStatus
} from '../graphql'
import { prisma } from '../prisma'

type ArgsUpdateSubmission = (
  | MutationAcceptSubmissionArgs
  | MutationRejectSubmissionArgs
) & {
  reviewerId: number
  status: SubmissionStatus
}

export type ArgsChatNotification = {
  submission: Submission & { challenge: Challenge; reviewer: User | null }
  userChatId: string
  reviewerId: number
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
