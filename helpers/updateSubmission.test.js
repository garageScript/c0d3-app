jest.mock('./dbload')
import db from './dbload'
import { updateSubmission } from './updateSubmission'

const { Challenge, Submission, UserLesson } = db

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
    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'not passed' }
    ]
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    Submission.findAll = jest.fn().mockReturnValue(submissions)
    const result = await updateSubmission(submission)

    expect(setStub).toHaveBeenCalledWith('reviewerId', 2)
    expect(setStub).toHaveBeenCalledWith('status', 'fake status')
    expect(setStub).toHaveBeenCalledWith('comment', 'fake comment')
    expect(saveStub).toHaveBeenCalled()
    expect(result).toEqual(submission)
  })

  test('should update user lesson', async () => {
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: () => {},
      save: () => {}
    }
    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' }
    ]
    const setStub = jest.fn()
    const saveStub = jest.fn()
    const lesson = {
      set: setStub,
      save: saveStub
    }
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    Submission.findAll = jest.fn().mockReturnValue(submissions)
    UserLesson.findOne = jest.fn().mockReturnValue(lesson)
    const result = await updateSubmission(submission)

    expect(setStub).toHaveBeenCalledWith('isPassed', true)
    expect(setStub).toHaveBeenCalledWith('isTeaching', true)
    expect(saveStub).toHaveBeenCalled()
    expect(result).toEqual(submission)
  })

  test('should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
