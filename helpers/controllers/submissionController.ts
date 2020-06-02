import db from '../dbload'
import { Context } from '../../@types/helpers'
import { decode } from '../encoding'
import { getUserByEmail, publicChannelMessage } from '../mattermost'

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
    const fixedDiff = diff.replace(/(.?\[\d*m)/g, '')
    const { id } = decode(cliToken)
    const { email, id: userId } = await User.findByPk(id)
    const [submission] = await Submission.findOrCreate({
      where: { lessonId, challengeId, userId }
    })
    await submission.update({ diff: fixedDiff, status: 'open', viewCount: 0 })
    const [challenge, lesson] = await Promise.all([
      Challenge.findByPk(challengeId),
      Lesson.findByPk(lessonId)
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

export const submissions = async (
  _parent: void,
  arg: ArgsGetSubmissions,
  _ctx: Context
) => {
  const { lessonId } = arg
  const subs = await Submission.findAll({
    where: {
      status: 'open',
      lessonId
    }
  })
  if (subs.length === 0) {
    return subs
  }
  const userIds = subs.reduce((acc: Set<number>, sub: any) => {
    acc.add(sub.userId)
    return acc
  }, new Set())
  const users = await Promise.all(
    Array.from(userIds).map((uniqueUser: any) =>
      User.findOne({ where: { id: uniqueUser } })
    )
  )
  const usersMap = users.reduce((acc: any, user: any) => {
    acc[user.id] = user
    return acc
  }, {})
  return subs.map((submission: any) => {
    const {
      id,
      diff,
      comment,
      challengeId,
      reviewerId,
      createdAt,
      userId
    } = submission
    return {
      id,
      userId,
      diff,
      comment,
      challengeId,
      reviewerId,
      createdAt,
      user: usersMap[userId]
    }
  })
}
