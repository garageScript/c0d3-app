jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('node-fetch')
jest.mock('mailgun-js')
import db from '../dbload'
import fetch from 'node-fetch'
import resolvers from '../../graphql/resolvers'
import { updateSubmission } from './submissionController'

const { Mutation } = resolvers
const { Lesson, Submission, User, Challenge } = db

describe('Submissions', () => {
  const args = {
    challengeId: 'fakeChallengeId',
    cliToken:
      'eyJpZCI6MTIxMCwiY2xpVG9rZW4iOiIxdHhrYndxMHYxa0hoenlHWmFmNTMifQ==',
    diff: 'fakeDiff',
    lessonId: 'fakeLessonId'
  }

  test('createSubmission should return submission', async () => {
    const submission = { ...args, update: jest.fn() }
    User.findByPk = jest
      .fn()
      .mockResolvedValue({ username: 'username', id: 'userId' })
    Submission.findOrCreate = jest.fn().mockResolvedValue([submission])
    Challenge.findByPk = jest.fn().mockReturnValue({ title: 'title' })
    Lesson.findByPk = jest.fn().mockReturnValue({
      chatUrl: 'https://fake/url/channels/js1-variablesfunction',
      id: 'fakeId'
    })
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ id: 'fakeId' })
    })
    const result = await Mutation.createSubmission(null, args)
    expect(result).toEqual(submission)
  })

  test('createSubmission should throw error Invalid args', async () => {
    await expect(Mutation.createSubmission(null, null)).rejects.toThrow(
      'Invalid args'
    )
  })

  test('updateSubmission should return submission', async () => {
    const setStub = jest.fn()
    const saveStub = jest.fn()
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewer: 2,
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

  test('updateSubmission should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
