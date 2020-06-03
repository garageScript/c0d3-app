import db from '../dbload'
import { Context } from '../../@types/helpers'
import { decode } from '../encoding'
import { getUserByEmail, publicChannelMessage } from '../mattermost'

const { User, Submission, Challenge, Lesson } = db

export type ArgsUpdateSubmission = {
  id: number
  comment: string
  reviewer: number
}

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
    await submission.update({ diff, status: 'open', viewCount: 0 })
    const [lesson, challenge] = await Promise.all([
      Lesson.findByPk(lessonId),
      Challenge.findByPk(challengeId)
    ])
    const lessonName = lesson.chatUrl.split('/').pop()
    const username = await getUserByEmail(email)
    const message = `@${username} has submitted a solution **_${challenge.title}_**. Click [here](<https://c0d3.com/teacher/${lesson.id}>) to review the code.`
    publicChannelMessage(lessonName, message)
    return submission
  } catch (error) {
    throw new Error(error)
  }
}

export const updateSubmission = async (
  args: ArgsUpdateSubmission & { status: string }
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const { id, comment, status, reviewer } = args
    let submission = await Submission.findByPk(id)

    submission.set('reviewerId', reviewer)
    submission.set('status', status)
    submission.set('comment', comment)
    await submission.save()

    return submission
  } catch (error) {
    throw new Error(error)
  }
}

export const submissions = async (
  _parent: void,
  arg: ArgsGetSubmissions,
  _ctx: Context
) => {
  const { lessonId } = arg
  return Submission.findAll({
    where: {
      status: 'open',
      lessonId
    },
    include: ['user']
  })
}
