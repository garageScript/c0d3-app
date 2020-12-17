import db from './dbload'
import { getUserByEmail, publicChannelMessage } from './mattermost'

const { Submission, Challenge, User, UserLesson, Lesson } = db

export type ArgsUpdateSubmission = {
  id: number
  comment: string
}

export const updateSubmission = async (
  args: ArgsUpdateSubmission & { reviewerId: number; status: SubmissionStatus }
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const { id, comment, status, reviewerId } = args
    // query submission that is being updated
    const submission = await Submission.findByPk(id)
    // count challenges inside lesson that submission belongs to
    const lessonChallengeCount = await Challenge.count({
      where: { lessonId: submission.lessonId }
    })

    // update and save submission data
    submission.set('reviewerId', reviewerId)
    submission.set('status', status)
    submission.set('comment', comment)
    await submission.save()

    // query other user submissions that belong to same lesson
    const lessonSubmissions = await Submission.findAll({
      where: {
        lessonId: submission.lessonId,
        userId: submission.userId
      }
    })

    // count how many submissions user passed in total
    const passedLessonSubmissions = lessonSubmissions.reduce(
      (sum: number, s: any) =>
        sum + (s.status === SubmissionStatus.PASSED ? 1 : 0),
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

    const [{ email }, currentLesson] = await Promise.all([
      User.findByPk(submission.userId), // query user data
      Lesson.findByPk(userLesson.lessonId) // query lesson data
    ])

    const [chatUsername, nextLesson] = await Promise.all([
      getUserByEmail(email), // get user chat username from email
      Lesson.findOne({
        // query next lesson
        where: { order: currentLesson.order + 1 }
      })
    ])

    // if current lesson has a chatUrl
    if (currentLesson.chatUrl) {
      const { chatUrl, title } = currentLesson
      const channelName = chatUrl.split('/').pop()
      // message public channel in mattermost
      await publicChannelMessage(
        channelName,
        `Congratulations to @${chatUsername} for passing and completing ${title}! @${chatUsername} is now a guardian angel for the students in this channel.`
      )
    }

    // if next lesson exists and has a chatUrl
    if (nextLesson && nextLesson.chatUrl) {
      const { chatUrl } = nextLesson
      const lessonName = chatUrl.split('/').pop()
      // message public channel in mattermost
      await publicChannelMessage(
        lessonName,
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
