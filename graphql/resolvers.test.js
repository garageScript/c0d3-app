jest.mock('node-fetch')
import fetch from 'node-fetch'
import resolvers from '../graphql/resolvers'
import db from '../helpers/dbload'
import bcrypt from 'bcrypt'

const { Query, Mutation } = resolvers
const { Lesson, User, Submission, UserLesson } = db

describe('GraphQL resolvers', () => {
  let user, args

  beforeEach(() => {
    jest.clearAllMocks()

    args = { cliToken: 'fakeCliToken' }
    user = {
      username: 'fakeUser',
      password: 'fakePassword',
      cliToken: 'fakeCliToken',
      update: () => Promise.resolve((user.cliToken = 'newCliToken'))
    }
  })

  test('lessons should return an empty array', async () => {
    Lesson.findAll = jest.fn().mockReturnValue([])
    expect(Query.lessons()).toEqual([])
  })

  test('should return submissions with a given lessonId', async () => {
    Submission.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.submissions(null, { lessonId: '2' })).toEqual([])
  })
})

describe('Session resolver', () => {
  let req

  beforeEach(() => {
    jest.clearAllMocks()

    req = { session: { userId: 2 } }
  })

  test('should return null if no userId', async () => {
    req.session = null
    expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('should return user null if no user found', async () => {
    User.findOne = jest.fn().mockReturnValue(null)
    Submission.findAll = jest.fn().mockReturnValue(null)
    UserLesson.findAll = jest.fn().mockReturnValue(null)

    expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('should return user including submissions and lessonStatus', async () => {
    const result = {
      user: { username: 'test' },
      submissions: [{ id: '1' }],
      lessonStatus: [{ id: '1' }]
    }

    User.findOne = jest.fn().mockReturnValue(result.user)
    Submission.findAll = jest.fn().mockReturnValue(result.submissions)
    UserLesson.findAll = jest.fn().mockReturnValue(result.lessonStatus)

    const returnValue = await resolvers.Query.session({}, {}, { req })

    expect(returnValue.user).toEqual(result.user)
    expect(returnValue.submissions).toEqual(result.submissions)
    expect(returnValue.lessonStatus).toEqual(result.lessonStatus)
  })
})

describe('GraphQL mutation', () => {
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
})
