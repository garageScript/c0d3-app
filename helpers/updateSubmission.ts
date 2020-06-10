import db from './dbload'
import { getUserByEmail, publicChannelMessage } from './mattermost'

const { Submission, Challenge, User, UserLesson, Lesson } = db

export type ArgsUpdateSubmission = {
  id: number
  comment: string
}

export const updateSubmission = async (
  args: ArgsUpdateSubmission & { reviewerId: number; status: string }
) => {
  try {
    if (!args) throw new Error('Invalid args')
    const { id, comment, status, reviewerId } = args
    const submission = await Submission.findByPk(id)
    const challengeCount = await Challenge.count({
      where: { lessonId: submission.lessonId }
    })

    submission.set('reviewerId', reviewerId)
    submission.set('status', status)
    submission.set('comment', comment)
    await submission.save()

    const submissions = await Submission.findAll({
      where: {
        lessonId: submission.lessonId,
        userId: submission.userId
      }
    })

    const passedSubmissions = submissions.reduce(
      (sum: number, s: any) => sum + (s.status === 'passed' ? 1 : 0),
      0
    )

    if (challengeCount === passedSubmissions) {
      const userLesson = await UserLesson.findOne({
        where: { lessonId: submission.lessonId }
      })

      if (!userLesson.isPassed) {
        const { email } = await User.findByPk(submission.userId)
        const { order, title, chatUrl } = await Lesson.findByPk(
          userLesson.lessonId
        )
        const chatUsername = await getUserByEmail(email)
        const nextLesson = await Lesson.findOne({
          where: { order: order + 1 }
        })

        const lessonChannel = chatUrl.split('/').pop()
        const nextLessonChannel = nextLesson.chatUrl.split('/').pop()

        await publicChannelMessage(
          lessonChannel,
          `Congratulations to @${chatUsername} for passing and completing ${title}! @${chatUsername} is now a guardian angel for the students in this channel.`
        )
        await publicChannelMessage(
          nextLessonChannel,
          `We have a new student joining us! @${chatUsername} just completed ${title}.`
        )
      }

      userLesson.set('isPassed', true)
      userLesson.set('isTeaching', true)
      await userLesson.save()
    }

    return submission
  } catch (error) {
    throw new Error(error)
  }
}
