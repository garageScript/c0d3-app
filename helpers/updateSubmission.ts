import db from './dbload'
import { SubmissionData } from '../@types/submission'
import {
  getUserByEmail,
  publicChannelMessage,
  sendDirectMessage
} from './mattermost'
import { SubmissionStatus } from '../graphql'

const { Submission, Challenge, User, UserLesson, Lesson } = db

export type ArgsUpdateSubmission = {
  id: number
  lessonId: string
  comment: string
}

export type ArgsChatNotification = {
  submission: SubmissionData
  userChatId: string
  reviewerId: number
}

export const updateSubmission = async (
  args: ArgsUpdateSubmission & { reviewerId: number; status: SubmissionStatus }
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const { id, comment, status, reviewerId } = args
    // query submission that is being updated
    const submission = await Submission.findByPk(id)

    // count challenges inside lesson that submission belongs to and query user email
    const [lessonChallengeCount, { email }] = await Promise.all([
      Challenge.count({
        where: { lessonId: submission.lessonId }
      }),
      User.findByPk(submission.userId)
    ])

    // update and save submission data
    submission.set('reviewerId', reviewerId)
    submission.set('status', status)
    submission.set('comment', comment)
    await submission.save()

    const [
      { id: userChatId, username: chatUsername },
      lessonSubmissions
    ] = await Promise.all([
      getUserByEmail(email), // query user chat id and username
      // query other user submissions that belong to same lesson
      Submission.findAll({
        where: {
          lessonId: submission.lessonId,
          userId: submission.userId
        }
      })
    ])

    sendChatNotification({
      submission,
      userChatId,
      reviewerId
    })

    // count how many submissions user passed in total
    const passedLessonSubmissions = lessonSubmissions.reduce(
      (sum: number, s: any) =>
        sum + (s.status === SubmissionStatus.Passed ? 1 : 0),
      0
    )

    // user has not passed all challenges in lesson
    // immediately return and do not proceed
    if (lessonChallengeCount !== passedLessonSubmissions) return submission

    // query userlesson that belongs to lesson and user
    const [userLesson] = await UserLesson.findOrCreate({
      where: {
        lessonId: submission.lessonId,
        userId: submission.userId
      }
    })

    // user is resubmitting to a lesson that he has already passed
    // immediately return and do not proceed
    if (userLesson.isPassed) return submission

    const currentLesson = await Lesson.findByPk(userLesson.lessonId)

    // query next lesson
    const nextLesson = await Lesson.findOne({
      where: { order: currentLesson.order + 1 }
    })

    // if current lesson has a chatUrl
    if (currentLesson.chatUrl) {
      // message public channel in mattermost
      publicChannelMessage(
        currentLesson.chatUrl.split('/').pop(),
        `Congratulations to @${chatUsername} for passing and completing ${currentLesson.title}! @${chatUsername} is now a guardian angel for the students in this channel.`
      )
    }

    // if next lesson exists and has a chatUrl
    if (nextLesson && nextLesson.chatUrl) {
      publicChannelMessage(
        nextLesson.chatUrl.split('/').pop(),
        `We have a new student joining us! @${chatUsername} just completed ${currentLesson.title}.`
      )
    }

    // update and save user lesson data
    userLesson.set('isPassed', Date.now().toString())
    userLesson.set('isTeaching', Date.now().toString())
    await userLesson.save()

    return submission
  } catch (error) {
    throw new Error(error)
  }
}

export const sendChatNotification = async (
  args: ArgsChatNotification
): Promise<void> => {
  const {
    submission: { status, comment, challengeId },
    userChatId,
    reviewerId
  } = args
  const { email: reviewerEmail } = await User.findByPk(reviewerId)
  const { username: reviewerChatUsername } = await getUserByEmail(reviewerEmail)
  const { title } = await Challenge.findByPk(challengeId)
  let message = `Your submission for the challenge **_${title}_** has been **${
    status === SubmissionStatus.Passed ? 'ACCEPTED' : 'REJECTED'
  }** by @${reviewerChatUsername}.`
  if (comment) {
    message += `\n\nThe reviewer left the following comment:\n\n___\n\n${comment}`
  }
  await sendDirectMessage(userChatId, message)
}
