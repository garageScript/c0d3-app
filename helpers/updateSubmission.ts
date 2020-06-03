import db from './dbload'

const { Submission } = db

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

    submission.set('reviewerId', reviewerId)
    submission.set('status', status)
    submission.set('comment', comment)
    await submission.save()

    return submission
  } catch (error) {
    throw new Error(error)
  }
}
