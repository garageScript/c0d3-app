import type { Submission } from '.prisma/client'
import {
  MutationAcceptSubmissionArgs,
  MutationRejectSubmissionArgs,
  SubmissionStatus
} from '../graphql'
import prisma from '../prisma'
import { sendDirectMessage, sendLessonChannelMessage } from './discordBot'
import { getDiscordMessageUserIdString } from './getDiscordMessageUserIdString'
import { MessageEmbedOptions } from 'discord.js'
import {
  C0D3_ICON_URL,
  CURRICULUM_URL,
  getLessonCoverPNG,
  PRIMARY_COLOR_HEX,
  PROFILE_URL
} from '../constants'

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
  const submission = await prisma.submission.update({
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

  const { user, lesson, reviewer, challenge } = submission

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

  const discordPromises = []

  // User hadn't already passed the lesson earlier,
  // and they have passed all the challenges in the lesson.
  if (
    userLesson.passedAt === null &&
    lessonChallengeCount === passedLessonSubmissions.length
  ) {
    // Get next lesson
    const nextLessonPromise = prisma.lesson.findFirst({
      where: { order: lesson.order + 1 }
    })
    const userString = getDiscordMessageUserIdString(user)

    // Message to lesson channel on discord
    discordPromises.push(
      sendLessonChannelMessage(
        lesson.id,
        `Congratulations to ${userString} for passing and completing **_${lesson.title}_** ! They are now a guardian angel for the students in this channel.`
      )
    )

    const nextLesson = await nextLessonPromise
    // Message in lesson channel on discord if next lesson exists
    if (nextLesson?.id != null) {
      discordPromises.push(
        sendLessonChannelMessage(
          nextLesson.id,
          `We have a new student joining us! ${userString} just completed **_${lesson.title}_** !`
        )
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
        passedAt: new Date()
      }
    })
  }

  if (user.discordId && reviewer) {
    const reviewerString = getDiscordMessageUserIdString(reviewer)
    const reviewNotificationEmbed: MessageEmbedOptions = {
      color: PRIMARY_COLOR_HEX,
      title: 'Submission Reviewed',
      url: `${CURRICULUM_URL}/${lesson.slug}`,
      thumbnail: {
        url: getLessonCoverPNG(lesson.order)
      },
      author: {
        name: reviewer!.name,
        url: `${PROFILE_URL}/${reviewer!.username}`,
        icon_url: C0D3_ICON_URL
      },
      description: `${reviewerString} reviewed your submission to the challenge **${
        challenge.title
      }**, they _**${
        submission.status === SubmissionStatus.Passed
          ? 'accepted it!'
          : 'requested some changes.'
      }**_`
    }

    if (submission.comment) {
      reviewNotificationEmbed.fields = [
        {
          name: 'They left the following comment',
          value: comment
        }
      ]
    }

    discordPromises.push(
      sendDirectMessage(user.discordId, '', reviewNotificationEmbed)
    )
  }

  await Promise.allSettled(discordPromises)
  return submission
}
