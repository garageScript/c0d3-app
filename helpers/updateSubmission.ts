import type { Challenge, Submission, User } from '.prisma/client'
import {
  MutationAcceptSubmissionArgs,
  MutationRejectSubmissionArgs,
  SubmissionStatus
} from '../graphql'
import { prisma } from '../prisma'
import {
  getUserByEmail,
  publicChannelMessage,
  sendDirectMessage
} from './mattermost'

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

    const [
      lessonChallengeCount,
      passedLessonSubmissions,
      userLesson,
      { id: userChatId, username: chatUsername }
    ] = await Promise.all([
      prisma.challenge.count({
        where: { lessonId }
      }),
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
      }),
      getUserByEmail(user.email) // query user chat id and username
    ])

    await sendChatNotification({
      submission,
      userChatId,
      reviewerId
    })

    // user is resubmitting to a lesson that he has already passed
    // or user has not passed all challenges in lesson
    // immediately return and do not proceed
    if (userLesson.isPassed || lessonChallengeCount !== passedLessonSubmissions)
      return submission

    // query next lesson
    const nextLesson = await prisma.lesson.findFirst({
      where: { order: lesson.order + 1 }
    })

    // if current lesson has a chatUrl
    if (lesson.chatUrl) {
      // message public channel in mattermost
      publicChannelMessage(
        lesson.chatUrl.split('/').pop()!,
        `Congratulations to @${chatUsername} for passing and completing ${lesson.title}! @${chatUsername} is now a guardian angel for the students in this channel.`
      )
    }

    // if next lesson exists and has a chatUrl
    if (nextLesson?.chatUrl) {
      publicChannelMessage(
        nextLesson.chatUrl.split('/').pop()!,
        `We have a new student joining us! @${chatUsername} just completed ${lesson.title}.`
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

export const sendChatNotification = async (
  args: ArgsChatNotification
): Promise<void> => {
  const {
    submission: { status, comment, reviewer, challenge },
    userChatId
  } = args
  if (!reviewer) return
  const { username: reviewerChatUsername } = await getUserByEmail(
    reviewer.email
  )
  let message = `Your submission for the challenge **_${
    challenge.title
  }_** has been **${
    status === SubmissionStatus.Passed ? 'ACCEPTED' : 'REJECTED'
  }** by @${reviewerChatUsername}.`
  if (comment) {
    message += `\n\nThe reviewer left the following comment:\n\n___\n\n${comment}`
  }
  sendDirectMessage(userChatId, message)
}
