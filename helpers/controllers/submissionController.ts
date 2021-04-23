import db from '../dbload'
import { Context } from '../../@types/helpers'
import { decode } from '../encoding'
import { getUserByEmail, publicChannelMessage } from '../mattermost'
import { updateSubmission, ArgsUpdateSubmission } from '../updateSubmission'
import { hasPassedLesson } from '../hasPassedLesson'
import _ from 'lodash'
import { SubmissionStatus } from '../../graphql'
import { prisma } from '../../prisma'

const { User, Submission, Challenge, Lesson } = db

type ArgsCreateSubmission = {
  lessonId: string
  cliToken: string
  diff: string
  challengeId: string
}

type ArgsGetSubmissions = {
  lessonId: string
}

export const createSubmission = async (
  _parent: void,
  args: ArgsCreateSubmission
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const { challengeId, cliToken, diff, lessonId } = args
    //to revert once CLI is fixed
    //regex removes the colors from the submission diff data
    const { id } = decode(cliToken)
    const { email, id: userId } = await User.findByPk(id)
    const [submission] = await Submission.findOrCreate({
      where: { lessonId, challengeId, userId }
    })

    await submission.update({
      diff,
      status: SubmissionStatus.Open,
      viewCount: 0
    })

    const [currentLesson, challenge] = await Promise.all([
      Lesson.findByPk(lessonId),
      Challenge.findByPk(challengeId)
    ])

    // query nextLesson based off order property of currentLesson
    const nextLesson = await Lesson.findOne({
      where: { order: currentLesson.order + 1 }
    })

    // if no Lesson was found nextLesson is null
    if (nextLesson) {
      const nextLessonChannelName = nextLesson.chatUrl.split('/').pop()
      const { username } = await getUserByEmail(email)
      const message = `@${username} has submitted a solution **_${challenge.title}_**. Click [here](<https://www.c0d3.com/review/${currentLesson.id}>) to review the code.`
      publicChannelMessage(nextLessonChannelName, message)
    }

    return submission
  } catch (error) {
    throw new Error(error)
  }
}

export const acceptSubmission = async (
  _parent: void,
  args: ArgsUpdateSubmission,
  ctx: Context
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const reviewerId = await getReviewer(ctx, args.lessonId)
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
  args: ArgsUpdateSubmission,
  ctx: Context
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const reviewerId = await getReviewer(ctx, args.lessonId)
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
  arg: ArgsGetSubmissions,
  ctx: Context
) => {
  try {
    const { lessonId } = arg
    await getReviewer(ctx, lessonId)
    // TODO fix lessonId graphql typedef to Int
    return prisma.submission.findMany({
      where: {
        status: SubmissionStatus.Open,
        lessonId: Number(lessonId)
      },
      include: {
        challenge: true,
        user: true
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

const getReviewer = async (
  ctx: Context,
  lessonId?: string
): Promise<number> => {
  const reviewerId: number | undefined = _.get(ctx, 'req.user.id', undefined)
  if (!reviewerId) throw new Error('Invalid user')
  if (lessonId && !(await hasPassedLesson(reviewerId, lessonId))) {
    throw new Error('User has not passed this lesson and cannot review.')
  }
  return reviewerId
}
