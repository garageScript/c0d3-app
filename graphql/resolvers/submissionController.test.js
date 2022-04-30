/**
 * @jest-environment node
 */

jest.mock('../../helpers/discordBot.ts')
jest.mock('../../helpers/hasPassedLesson')
jest.mock('../../helpers/updateSubmission')
jest.mock('@sentry/node')
import { SubmissionStatus } from '../../graphql'
import prismaMock from '../../__tests__/utils/prismaMock'
import { hasPassedLesson } from '../../helpers/hasPassedLesson'
import { updateSubmission } from '../../helpers/updateSubmission'
import {
  acceptSubmission,
  createSubmission,
  getReviewer,
  rejectSubmission,
  submissions
} from './submissionController'
import * as Sentry from '@sentry/node'

describe('Submissions Mutations', () => {
  hasPassedLesson.mockResolvedValue(true)

  const submissionMock = {
    diff: 'fakeDiff',
    lesson: {
      order: 1,
      title: 'Fake lesson',
      chatUrl: 'https://fake.com/lesson-chat'
    },
    challenge: {
      title: 'Fake challenge'
    },
    user: {
      email: 'fake@email.com'
    }
  }

  describe('createSubmission', () => {
    const args = {
      challengeId: 1,
      cliToken:
        'eyJpZCI6MTIxMCwiY2xpVG9rZW4iOiIxdHhrYndxMHYxa0hoenlHWmFmNTMifQ==',
      diff: 'fakeDiff',
      lessonId: 1
    }
    const ctx = { req: { user: { id: 2 } } }

    beforeEach(() => {
      prismaMock.submission.create.mockResolvedValue({
        id: 1,
        ...submissionMock
      })
      prismaMock.lesson.findFirst.mockResolvedValue(null)
    })

    test('should save and return submission', async () => {
      expect.assertions(1)

      await expect(createSubmission(null, args, ctx)).resolves.toEqual({
        id: 1,
        diff: 'fakeDiff',
        lesson: {
          order: 1,
          title: 'Fake lesson',
          chatUrl: 'https://fake.com/lesson-chat'
        },
        challenge: { title: 'Fake challenge' },
        user: { email: 'fake@email.com' }
      })
    })

    test('should overwrite previous submission status if it exists', async () => {
      expect.assertions(1)

      prismaMock.submission.findFirst.mockResolvedValue({ id: 1 })
      await createSubmission(null, args, ctx)
      expect(prismaMock.submission.update).toBeCalled()
    })

    test('should throw error Invalid args', () => {
      expect.assertions(1)

      return expect(createSubmission(null, null, ctx)).rejects.toThrow(
        'Invalid args'
      )
    })

    test('should set id to the decoded clientToken id when req.user is undefined', async () => {
      expect.assertions(1)

      await createSubmission(null, args, { ...ctx, req: { user: null } })
      expect(prismaMock.user.findFirst).toBeCalled()
    })

    test('should send message to Sentry if req.user does not exist and cliToken does', async () => {
      expect.assertions(1)

      prismaMock.user.findFirst.mockResolvedValue({
        id: 1210,
        username: 'noob'
      })
      await createSubmission(null, args, { ...ctx, req: { user: null } })
      expect(Sentry.captureException).toHaveBeenCalledWith({
        message: `${1210}/${'noob'} is using CLI version that is lower than 2.2.5 - Must be 2.2.5^`
      })
    })

    test('should send message to Sentry with user cliVersion if req.user does not exist and cliToken does', async () => {
      expect.assertions(1)

      prismaMock.user.findFirst.mockResolvedValue({
        id: 1210,
        username: 'noob',
        cliVersion: '2.2.6'
      })
      await createSubmission(null, args, { ...ctx, req: { user: null } })
      expect(Sentry.captureException).toHaveBeenCalledWith({
        message: `${1210}/${'noob'} is using CLI version 2.2.6 - Must be 2.2.5^`
      })
    })
  })

  describe('acceptSubmission', () => {
    it('should call updateSubmission', async () => {
      expect.assertions(1)

      const submission = { id: 1, comment: 'fake comment', reviewer: 2 }
      const ctx = { req: { user: { id: 2 } } }
      await acceptSubmission(null, submission, ctx)
      expect(updateSubmission).toHaveBeenCalledWith({
        ...submission,
        reviewerId: 2,
        status: SubmissionStatus.Passed
      })
    })

    it('should throw error with no args', () => {
      expect.assertions(1)

      return expect(acceptSubmission(null, null, { req: {} })).rejects.toThrow(
        'Invalid args'
      )
    })

    it('should throw error with no user', () => {
      expect.assertions(1)

      const submission = { id: 1, comment: 'fake comment' }
      return expect(
        acceptSubmission(null, submission, { req: {} })
      ).rejects.toThrow('Invalid user')
    })
  })

  describe('rejectSubmission', () => {
    it('should call updateSubmission', async () => {
      expect.assertions(1)

      const submission = { id: 1, comment: 'fake comment' }
      const ctx = { req: { user: { id: 2 } } }
      await rejectSubmission(null, submission, ctx)
      expect(updateSubmission).toHaveBeenCalledWith({
        ...submission,
        reviewerId: 2,
        status: SubmissionStatus.NeedMoreWork
      })
    })

    it('should throw error with no args', () => {
      expect.assertions(1)

      return expect(rejectSubmission(null, null, { req: {} })).rejects.toThrow(
        'Invalid args'
      )
    })

    it('should throw error with no user', () => {
      expect.assertions(1)

      const submission = { id: 1, comment: 'fake comment' }
      return expect(
        rejectSubmission(null, submission, { req: {} })
      ).rejects.toThrow('Invalid user')
    })
  })
})

describe('Submissions Queries', () => {
  hasPassedLesson.mockResolvedValue(true)

  it('should return no submissions if there are none open', async () => {
    expect.assertions(1)

    prismaMock.submission.findMany.mockReturnValue([])
    const result = await submissions(
      null,
      { lessonId: '2' },
      { req: { user: { id: 2 } } }
    )
    expect(result).toEqual([])
  })

  it('should return submissions with a given lessonId', async () => {
    expect.assertions(1)

    const user = { id: 1, username: 'Michael' }
    const submissionResults = {
      id: 5,
      user,
      diff: 'diff --git a/js1/12.js b/js1/12.js↵index e7dc26e..d0cdf56 100644↵--- a/js1/12.js↵+++ b/js1/12.js↵@@ -9,8 +9,17 @@↵  * @returns null↵  */↵ ↵-const solution = (a, fun) => {↵+const solution = (a, fun,i =0) => {↵+↵+  if(i < 2){↵+    setTimeout(()=> {↵+      b = fun()↵+      return solution(b,fun, i +1)↵+    }, a)↵+    ↵ }↵+   ↵+  }↵ ↵ module.exports = {↵   solution↵',
      comment: '',
      createdAt: '1586386486986',
      challengeId: '200'
    }
    prismaMock.submission.findMany.mockResolvedValue([submissionResults])
    const result = await submissions(
      null,
      { lessonId: '2' },
      { req: { user: { id: 2 } } }
    )
    expect(result).toEqual([submissionResults])
  })

  it('should throw error if no user is authenticated', () => {
    expect.assertions(1)

    return expect(
      submissions(null, { lessonId: '2' }, { req: {} })
    ).rejects.toThrow('Invalid user')
  })
})

describe('getReviewer', () => {
  it('should throw error if reviewerId is falsy', () => {
    expect.assertions(1)

    return expect(getReviewer()).rejects.toThrow('Invalid user')
  })

  it('should return user id if user has completed the lesson', () => {
    expect.assertions(1)

    hasPassedLesson.mockResolvedValueOnce(true)
    return expect(getReviewer({ id: 1 }, 1)).resolves.toBe(1)
  })

  it('should throw error if user has not completed the lesson', () => {
    expect.assertions(1)

    hasPassedLesson.mockResolvedValueOnce(false)
    return expect(getReviewer({ id: 1 }, 1)).rejects.toThrow(
      'User has not passed this lesson and cannot review.'
    )
  })
})
