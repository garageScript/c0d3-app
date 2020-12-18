jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('node-fetch')
jest.mock('mailgun-js')
jest.mock('../hasPassedLesson')
import db from '../dbload'
import resolvers from '../../graphql/resolvers'
import { publicChannelMessage, getUserByEmail } from '../mattermost'
import { submissions } from './submissionController'
import { hasPassedLesson } from '../hasPassedLesson'
const { Mutation } = resolvers
const { Lesson, Submission, User, Challenge } = db

describe('Submissions Mutations', () => {
  jest.unmock('../updateSubmission')

  const controller = jest.requireActual('../updateSubmission')
  controller.updateSubmission = jest.fn()

  const args = {
    challengeId: 'fakeChallengeId',
    cliToken:
      'eyJpZCI6MTIxMCwiY2xpVG9rZW4iOiIxdHhrYndxMHYxa0hoenlHWmFmNTMifQ==',
    diff: 'fakeDiff',
    lessonId: 'fakeLessonId'
  }

  describe('createSubmission', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    test('should return submission', async () => {
      const submission = { ...args, update: jest.fn() }
      const username = 'fake user'
      const challengeTitle = 'fake challenge title'
      const lessonId = '1337'

      // mock the current user
      User.findByPk = jest.fn().mockResolvedValue({ username, id: 'userId' })

      // mock the submission
      Submission.findOrCreate = jest.fn().mockResolvedValue([submission])

      // mock the challenge that is associated with the submission
      Challenge.findByPk = jest.fn().mockReturnValue({ title: challengeTitle })

      // mock the current lesson that is associated with the submission
      Lesson.findByPk = jest.fn().mockReturnValue({
        chatUrl: 'https://fake/url/channels/js1-variablesfunction',
        id: lessonId,
        order: 1
      })

      // mock the next lesson
      Lesson.findOne = jest.fn().mockReturnValue(null)

      // mock mattermost getUserByEmail
      getUserByEmail.mockReturnValue(username)

      const res = await Mutation.createSubmission(null, args)
      expect(res).toEqual(submission)
    })

    test('should notify next lesson channel when there is a next lesson', async () => {
      const submission = { ...args, update: jest.fn() }
      const username = 'fake user'
      const channelName = 'js2-arrays'
      const challengeTitle = 'fake challenge title'
      const lessonId = '1337'

      // mock the current user
      User.findByPk = jest.fn().mockResolvedValue({ username, id: 'userId' })

      // mock the submission
      Submission.findOrCreate = jest.fn().mockResolvedValue([submission])

      // mock the challenge that is associated with the submission
      Challenge.findByPk = jest.fn().mockReturnValue({ title: challengeTitle })

      // mock the current lesson that is associated with the submission
      Lesson.findByPk = jest.fn().mockReturnValue({
        chatUrl: 'https://fake/url/channels/js1-variablesfunction',
        id: lessonId,
        order: 1
      })

      // mock the next lesson
      Lesson.findOne = jest.fn().mockReturnValue({
        chatUrl: `https://fake/url/channels/${channelName}`,
        order: 2
      })

      // mock mattermost getUserByEmail
      getUserByEmail.mockReturnValue({ username })

      await Mutation.createSubmission(null, args)
      expect(publicChannelMessage).toHaveBeenCalledWith(
        channelName,
        `@${username} has submitted a solution **_${challengeTitle}_**. Click [here](<https://www.c0d3.com/review/${lessonId}>) to review the code.`
      )
    })

    test('should not notify any channel when there is no next lesson', async () => {
      const submission = { ...args, update: jest.fn() }
      const username = 'fake user'
      const challengeTitle = 'fake challenge title'
      const lessonId = '1337'

      // mock the current user
      User.findByPk = jest.fn().mockResolvedValue({ username, id: 'userId' })

      // mock the submission
      Submission.findOrCreate = jest.fn().mockResolvedValue([submission])

      // mock the challenge that is associated with the submission
      Challenge.findByPk = jest.fn().mockReturnValue({ title: challengeTitle })

      // mock the current lesson that is associated with the submission
      Lesson.findByPk = jest.fn().mockReturnValue({
        chatUrl: 'https://fake/url/channels/js1-variablesfunction',
        id: lessonId,
        order: 1
      })

      // mock the next lesson
      Lesson.findOne = jest.fn().mockReturnValue(null)

      // mock mattermost getUserByEmail
      getUserByEmail.mockReturnValue({ username })

      await Mutation.createSubmission(null, args)
      expect(publicChannelMessage).not.toHaveBeenCalled()
    })

    test('should throw error Invalid args', async () => {
      await expect(Mutation.createSubmission(null, null)).rejects.toThrow(
        'Invalid args'
      )
    })
  })

  test('acceptSubmission should call updateSubmission', async () => {
    const submission = { id: 1, comment: 'fake comment', reviewer: 2 }
    const ctx = { req: { user: { id: 2 } } }
    await resolvers.Mutation.acceptSubmission(null, submission, ctx)
    expect(controller.updateSubmission).toHaveBeenCalledWith({
      ...submission,
      reviewerId: 2,
      status: 'passed'
    })
  })

  test('acceptSubmission should throw error with no args', async () => {
    await expect(resolvers.Mutation.acceptSubmission()).rejects.toThrow(
      'Invalid args'
    )
  })

  test('acceptSubmission should throw error with no user', async () => {
    const submission = { id: 1, comment: 'fake comment' }
    await expect(
      resolvers.Mutation.acceptSubmission(null, submission)
    ).rejects.toThrow('Invalid user')
  })

  test('acceptSubmission should throw error if user has not passed the lesson', async () => {
    hasPassedLesson.mockReturnValue(false)
    const submission = { id: 1, lessonId: 5, comment: 'fake comment' }
    await expect(
      resolvers.Mutation.acceptSubmission(null, submission, {
        req: { user: { id: 1 } }
      })
    ).rejects.toThrow('User has not passed this lesson and cannot review.')
  })

  test('rejectSubmission should call updateSubmission', async () => {
    const submission = { id: 1, comment: 'fake comment' }
    const ctx = { req: { user: { id: 2 } } }
    await resolvers.Mutation.rejectSubmission(null, submission, ctx)
    expect(controller.updateSubmission).toHaveBeenCalledWith({
      ...submission,
      reviewerId: 2,
      status: 'needMoreWork'
    })
  })

  test('rejectSubmission should throw error with no args', async () => {
    await expect(resolvers.Mutation.rejectSubmission()).rejects.toThrow(
      'Invalid args'
    )
  })

  test('rejectSubmission should throw error with no user', async () => {
    const submission = { id: 1, comment: 'fake comment' }
    await expect(
      resolvers.Mutation.rejectSubmission(null, submission)
    ).rejects.toThrow('Invalid user')
  })

  test('rejectSubmission should throw error if user has not passed the lesson', async () => {
    hasPassedLesson.mockReturnValue(false)
    const submission = { id: 1, lessonId: 5, comment: 'fake comment' }
    await expect(
      resolvers.Mutation.rejectSubmission(null, submission, {
        req: { user: { id: 1 } }
      })
    ).rejects.toThrow('User has not passed this lesson and cannot review.')
  })
})

describe('Submissions Queries', () => {
  test('should return no submissions if there are none open', async () => {
    Submission.findAll = jest.fn().mockReturnValue([])
    hasPassedLesson.mockReturnValue(true)
    const result = await submissions(
      null,
      { lessonId: '2' },
      { req: { user: { id: 2 } } }
    )
    expect(result).toEqual([])
  })
  test('should return submissions with a given lessonId', async () => {
    const user = { id: 1, username: 'Michael' }
    const submissionResults = {
      id: 5,
      user,
      diff:
        'diff --git a/js1/12.js b/js1/12.js↵index e7dc26e..d0cdf56 100644↵--- a/js1/12.js↵+++ b/js1/12.js↵@@ -9,8 +9,17 @@↵  * @returns null↵  */↵ ↵-const solution = (a, fun) => {↵+const solution = (a, fun,i =0) => {↵+↵+  if(i < 2){↵+    setTimeout(()=> {↵+      b = fun()↵+      return solution(b,fun, i +1)↵+    }, a)↵+    ↵ }↵+   ↵+  }↵ ↵ module.exports = {↵   solution↵',
      comment: '',
      createdAt: '1586386486986',
      challengeId: '200'
    }
    Submission.findAll = jest.fn().mockResolvedValue([submissionResults])
    hasPassedLesson.mockReturnValue(true)
    const result = await submissions(
      null,
      { lessonId: '2' },
      { req: { error: jest.fn(), user: { id: 2 } } }
    )
    expect(result).toEqual([submissionResults])
  })
  test('should throw error if the user has not passed the lesson', () => {
    hasPassedLesson.mockReturnValue(false)
    expect(
      submissions(null, { lessonId: '2' }, { req: { user: { id: 2 } } })
    ).rejects.toThrow('User has not passed this lesson and cannot review.')
  })
  test('should throw error if no user is authenticated', () => {
    expect(submissions(null, { lessonId: '2' }, null)).rejects.toThrow(
      'Invalid user'
    )
  })
})
