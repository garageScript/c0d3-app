jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('node-fetch')
jest.mock('mailgun-js')
import db from '../dbload'
import fetch from 'node-fetch'
import resolvers from '../../graphql/resolvers'

const { Mutation } = resolvers
const { Lesson, Submission, User, Challenge } = db

describe('Submissions', () => {
  jest.unmock('../updateSubmission')

  const controller = require.requireActual('../updateSubmission')
  controller.updateSubmission = jest.fn()

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

  test('acceptSubmission should call updateSubmission', async () => {
    const submission = { id: 1, comment: 'fake comment', reviewer: 2 }
    const ctx = { req: { session: { userId: 2 } } }
    await resolvers.Mutation.acceptSubmission(null, submission, ctx)
    expect(controller.updateSubmission).toHaveBeenCalledWith({
      ...submission,
      reviewerId: 2,
      status: 'passed'
    })
  })

  test('acceptSubmission should throw error with no args', async () => {
    await await expect(resolvers.Mutation.acceptSubmission()).rejects.toThrow(
      'Invalid args'
    )
  })

  test('acceptSubmission should throw error with no user', async () => {
    const submission = { id: 1, comment: 'fake comment' }
    await await expect(
      resolvers.Mutation.acceptSubmission(null, submission)
    ).rejects.toThrow('Invalid user')
  })

  test('rejectSubmission should call updateSubmission', async () => {
    const submission = { id: 1, comment: 'fake comment' }
    const ctx = { req: { session: { userId: 2 } } }
    await resolvers.Mutation.rejectSubmission(null, submission, ctx)
    expect(controller.updateSubmission).toHaveBeenCalledWith({
      ...submission,
      reviewerId: 2,
      status: 'needMoreWork'
    })
  })

  test('rejectSubmission should throw error with no args', async () => {
    await await expect(resolvers.Mutation.rejectSubmission()).rejects.toThrow(
      'Invalid args'
    )
  })

  test('rejectSubmission should throw error with no user', async () => {
    const submission = { id: 1, comment: 'fake comment' }
    await await expect(
      resolvers.Mutation.rejectSubmission(null, submission)
    ).rejects.toThrow('Invalid user')
  })
})
