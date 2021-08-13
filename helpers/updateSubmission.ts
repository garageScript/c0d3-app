import type { Submission } from '.prisma/client'
import {
  MutationAcceptSubmissionArgs,
  MutationRejectSubmissionArgs,
  SubmissionStatus
} from '../graphql'
import prisma from '../prisma'
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
    await prisma.$transaction([
      prisma.challenge.count({ where: { lessonId } }),
      prisma.submission.findMany({
        where: { lessonId, userId: user.id, status: SubmissionStatus.Passed },
        distinct: ['challengeId'],
        select: {
          challengeId: true
        }
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
    userLesson.passedAt ||
    lessonChallengeCount !== passedLessonSubmissions.length
  ) {
    return submission
  }

  // TODO: Add support for discord ids when oauth implementation is complete

  // Get next lesson
  const nextLesson = await prisma.lesson.findFirst({
    where: { order: lesson.order + 1 }
  })

  const discordPromises = []
  // Message in lesson channel on discord
  discordPromises.push(
    sendLessonChannelMessage(
      lesson.id,
      `Congratulations to **${user.username}** for passing and completing **_${lesson.title}_** ! **${user.username}** is now a guardian angel for the students in this channel.`
    )
  )

  // Message in lesson channel on discord if next lesson exists
  if (nextLesson?.id != null) {
    discordPromises.push(
      await sendLessonChannelMessage(
        nextLesson.id,
        `We have a new student joining us! **${user.username}** just completed **_${lesson.title}_** !`
      )
    )
  }

  await Promise.all(discordPromises)

  // update and save user lesson data
  await prisma.userLesson.update({
    where: {
      lessonId_userId: {
        lessonId,
        userId: user.id
      }
    },
    data: {
      passedAt: new Date()
    }
  })

  return submission
}
