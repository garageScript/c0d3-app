jest.mock('./dbload')
import db from './dbload'
import { updateSubmission } from './updateSubmission'

const { Submission } = db

describe('updateSubmission', () => {
  test('should return submission', async () => {
    const setStub = jest.fn()
    const saveStub = jest.fn()
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: setStub,
      save: saveStub
    }
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    const result = await updateSubmission(submission)

    expect(setStub).toHaveBeenCalledWith('reviewerId', 2)
    expect(setStub).toHaveBeenCalledWith('status', 'fake status')
    expect(setStub).toHaveBeenCalledWith('comment', 'fake comment')
    expect(saveStub).toHaveBeenCalled()
    expect(result).toEqual(submission)
  })

  test('should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
