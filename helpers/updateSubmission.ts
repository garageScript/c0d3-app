import db from './dbload'

const { Submission, Challenge, UserLesson } = db

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
      const lesson = await UserLesson.findOne({
        where: { lessonId: submission.lessonId }
      })
      lesson.set('isPassed', true)
      lesson.set('isTeaching', true)
      await lesson.save()
    }

    return submission
  } catch (error) {
    throw new Error(error)
  }
}
