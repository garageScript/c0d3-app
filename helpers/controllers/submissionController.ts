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
import { prisma } from '../../prisma'
import { decode } from '../encoding'
import { hasPassedLesson } from '../hasPassedLesson'
import { updateSubmission } from '../updateSubmission'

export const createSubmission = async (
  _parent: void,
  args: MutationCreateSubmissionArgs
): Promise<CreateSubmissionMutation['createSubmission']> => {
  try {
    if (!args) throw new Error('Invalid args')
    const { challengeId, cliToken, diff, lessonId } = args
    const { id } = decode(cliToken)
    const previousSubmission = await prisma.submission.findFirst({
      where: {
        challengeId,
        lessonId,
        user: {
          id
        },
        status: SubmissionStatus.Open
      }
    })
    if (previousSubmission) {
      await prisma.submission.update({
        where: {
          id: previousSubmission.id
        },
        data: {
          status: SubmissionStatus.Overwritten
        }
      })
    }
    return prisma.submission.create({
      data: {
        challengeId,
        lessonId,
        userId: id,
        diff,
        status: SubmissionStatus.Open
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const acceptSubmission = async (
  _parent: void,
  args: MutationAcceptSubmissionArgs,
  ctx: Context
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const reviewerId = await getReviewer(ctx.req.user, args.lessonId)
    return updateSubmission({
      ...args,
      reviewerId,
      status: SubmissionStatus.Passed
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const rejectSubmission = async (
  _parent: void,
  args: MutationRejectSubmissionArgs,
  ctx: Context
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const reviewerId = await getReviewer(ctx.req.user, args.lessonId)
    return updateSubmission({
      ...args,
      reviewerId,
      status: SubmissionStatus.NeedMoreWork
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const submissions = async (
  _parent: void,
  arg: QuerySubmissionsArgs,
  ctx: Context
) => {
  try {
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
  } catch (error) {
    throw new Error(error)
  }
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
