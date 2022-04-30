import { User } from '.prisma/client'
import { Context } from '../../@types/helpers'
import {
  CreateSubmissionMutation,
  MutationAcceptSubmissionArgs,
  MutationCreateSubmissionArgs,
  MutationRejectSubmissionArgs,
  QuerySubmissionsArgs,
  SubmissionStatus
} from '../../graphql'
import prisma from '../../prisma'
import { hasPassedLesson } from '../../helpers/hasPassedLesson'
import { updateSubmission } from '../../helpers/updateSubmission'
import { sendSubmissionNotification, IdType } from '../../helpers/discordBot'
import { decode } from '../../helpers/encoding'
import * as Sentry from '@sentry/node'
import { CliToken } from '../../@types/user'

export const createSubmission = async (
  _parent: void,
  args: MutationCreateSubmissionArgs,
  ctx: Context
): Promise<CreateSubmissionMutation['createSubmission']> => {
  const { req } = ctx

  if (!args) throw new Error('Invalid args')
  const { challengeId, cliToken, diff, lessonId } = args

  let id = req.user!?.id

  if (!id && cliToken) {
    const decodedCliToken: CliToken = cliToken && decode(cliToken)
    const user = await prisma.user.findFirst({
      where: { cliToken: decodedCliToken.cliToken }
    })

    id = user!?.id

    Sentry.captureException({
      message: `${user?.id}/${user?.username} is using CLI version ${
        user?.cliVersion || 'that is lower than 2.2.5'
      } - Must be 2.2.5^`
    })
  }

  const previousSubmission = await prisma.submission.findFirst({
    where: {
      challengeId,
      lessonId,
      user: { id },
      status: SubmissionStatus.Open
    }
  })
  if (previousSubmission) {
    await prisma.submission.update({
      where: { id: previousSubmission.id },
      data: {
        status: SubmissionStatus.Overwritten
      }
    })
  }
  const submission = await prisma.submission.create({
    data: {
      challengeId,
      lessonId,
      userId: id,
      diff,
      status: SubmissionStatus.Open
    },
    include: {
      challenge: true,
      user: true,
      lesson: true
    }
  })

  const { challenge, user, lesson } = submission

  // TODO: Add support for discord ids when oauth implementation is complete

  // Get next lesson
  const nextLesson = await prisma.lesson.findFirst({
    where: { order: lesson.order + 1 }
  })

  await sendSubmissionNotification(
    IdType.C0D3,
    user.username,
    nextLesson?.id ?? lessonId,
    lesson.slug,
    challenge.title
  )

  return submission
}

export const acceptSubmission = async (
  _parent: void,
  args: MutationAcceptSubmissionArgs,
  ctx: Context
) => {
  if (!args) throw new Error('Invalid args')
  const reviewerId = await getReviewer(ctx.req.user, args.lessonId)
  return updateSubmission({
    ...args,
    reviewerId,
    status: SubmissionStatus.Passed
  })
}

export const rejectSubmission = async (
  _parent: void,
  args: MutationRejectSubmissionArgs,
  ctx: Context
) => {
  if (!args) throw new Error('Invalid args')
  const reviewerId = await getReviewer(ctx.req.user, args.lessonId)
  return updateSubmission({
    ...args,
    reviewerId,
    status: SubmissionStatus.NeedMoreWork
  })
}

export const submissions = async (
  _parent: void,
  arg: QuerySubmissionsArgs,
  ctx: Context
) => {
  const { lessonId } = arg
  await getReviewer(ctx.req.user, lessonId)
  return prisma.submission.findMany({
    where: {
      status: SubmissionStatus.Open,
      lessonId: lessonId
    },
    include: {
      challenge: true,
      user: true,
      reviewer: true,
      comments: {
        include: {
          author: true
        }
      }
    }
  })
}

export const getReviewer = async (
  user: User | null,
  lessonId: number
): Promise<number> => {
  const reviewerId = user?.id
  if (!reviewerId) throw new Error('Invalid user')
  if (!(await hasPassedLesson(reviewerId, lessonId))) {
    throw new Error('User has not passed this lesson and cannot review.')
  }
  return reviewerId
}
