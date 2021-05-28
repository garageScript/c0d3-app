jest.mock('../hasPassedLesson')
jest.mock('../updateSubmission')
jest.mock('../mattermost')
import { SubmissionStatus } from '../../graphql'
import { prisma } from '../../prisma'
import { hasPassedLesson } from '../hasPassedLesson'
import { getUserByEmail, publicChannelMessage } from '../mattermost'
import { updateSubmission } from '../updateSubmission'
import {
  acceptSubmission,
  createSubmission,
  rejectSubmission,
  submissions,
  getReviewer
} from './submissionController'

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

    beforeEach(() => {
      prisma.submission.upsert = jest
        .fn()
        .mockResolvedValue({ id: 1, ...submissionMock })
      prisma.lesson.findFirst = jest.fn().mockResolvedValue(null)
    })

    test('should return submission', () => {
      return expect(createSubmission(null, args)).resolves.toEqual({
        id: 1,
        diff: 'fakeDiff'
      })
    })

    test('should notify next lesson channel when there is a next lesson', async () => {
      const username = 'fake user'
      const channelName = 'js2-arrays'
      prisma.lesson.findFirst = jest.fn().mockResolvedValue({
        chatUrl: `https://fake/url/channels/${channelName}`,
        order: 2
      })
      getUserByEmail.mockReturnValue({ username })

      await createSubmission(null, args)
      expect(publicChannelMessage).toHaveBeenCalledWith(
        channelName,
        `@${username} has submitted a solution **_${submissionMock.challenge.title}_**. Click [here](<https://www.c0d3.com/review/1>) to review the code.`
      )
    })

    test('should not notify any channel when there is no next lesson', async () => {
      await createSubmission(null, args)
      expect(publicChannelMessage).not.toHaveBeenCalled()
    })

    test('should throw error Invalid args', () => {
      return expect(createSubmission(null, null)).rejects.toThrow(
        'Invalid args'
      )
    })
  })

  describe('acceptSubmission', () => {
    it('should call updateSubmission', async () => {
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
      return expect(acceptSubmission(null, null, { req: {} })).rejects.toThrow(
        'Invalid args'
      )
    })

    it('should throw error with no user', () => {
      const submission = { id: 1, comment: 'fake comment' }
      return expect(
        acceptSubmission(null, submission, { req: {} })
      ).rejects.toThrow('Invalid user')
    })
  })

  describe('rejectSubmission', () => {
    it('should call updateSubmission', async () => {
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
      return expect(rejectSubmission(null, null, { req: {} })).rejects.toThrow(
        'Invalid args'
      )
    })

    it('should throw error with no user', () => {
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
    prisma.submission.findMany = jest.fn().mockReturnValue([])
    const result = await submissions(
      null,
      { lessonId: '2' },
      { req: { user: { id: 2 } } }
    )
    expect(result).toEqual([])
  })

  it('should return submissions with a given lessonId', async () => {
    const user = { id: 1, username: 'Michael' }
    const submissionResults = {
      id: 5,
      user,
      diff: 'diff --git a/js1/12.js b/js1/12.js↵index e7dc26e..d0cdf56 100644↵--- a/js1/12.js↵+++ b/js1/12.js↵@@ -9,8 +9,17 @@↵  * @returns null↵  */↵ ↵-const solution = (a, fun) => {↵+const solution = (a, fun,i =0) => {↵+↵+  if(i < 2){↵+    setTimeout(()=> {↵+      b = fun()↵+      return solution(b,fun, i +1)↵+    }, a)↵+    ↵ }↵+   ↵+  }↵ ↵ module.exports = {↵   solution↵',
      comment: '',
      createdAt: '1586386486986',
      challengeId: '200'
    }
    prisma.submission.findMany = jest
      .fn()
      .mockResolvedValue([submissionResults])
    const result = await submissions(
      null,
      { lessonId: '2' },
      { req: { user: { id: 2 } } }
    )
    expect(result).toEqual([submissionResults])
  })

  it('should throw error if no user is authenticated', () => {
    return expect(
      submissions(null, { lessonId: '2' }, { req: {} })
    ).rejects.toThrow('Invalid user')
  })
})

describe('getReviewer', () => {
  it('should throw error if reviewerId is falsy', () => {
    return expect(getReviewer()).rejects.toThrow('Invalid user')
  })

  it('should return user id if user has completed the lesson', () => {
    hasPassedLesson.mockResolvedValueOnce(true)
    return expect(getReviewer({ id: 1 }, 1)).resolves.toBe(1)
  })

  it('should throw error if user has not completed the lesson', () => {
    hasPassedLesson.mockResolvedValueOnce(false)
    return expect(getReviewer({ id: 1 }, 1)).rejects.toThrow(
      'User has not passed this lesson and cannot review.'
    )
  })
})
