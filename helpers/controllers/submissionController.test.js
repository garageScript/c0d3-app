jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('node-fetch')

import db from '../dbload'
import fetch from 'node-fetch'
import resolvers from '../../graphql/resolvers'

const { Mutation } = resolvers
const { Lesson, Submission, User } = db

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
    Promise.all = jest.fn().mockResolvedValue([
      { title: 'title' },
      {
        chatUrl: 'https://fake/url/channels/js1-variablesfunction',
        id: 'fakeId'
      }
    ])
    Lesson.findByPk = jest.fn()
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ id: 'fakeId' })
    })

    expect(Mutation.createSubmission(null, args)).resolves.toEqual(submission)
  })

  test('createSubmission should throw error Invalid args', async () => {
    await expect(Mutation.createSubmission(null, null)).rejects.toThrow(
      'Invalid args'
    )
  })

  test('submissions should return submissions with a given lessonId', async () => {
    Submission.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.submissions(null, { lessonId: '2' })).toEqual([])
  })
})
