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

  beforeEach(() => {
    jest.clearAllMocks()
    hasPassedLesson.mockResolvedValue(true)
  })

  describe('createSubmission', () => {
    const args = {
      challengeId: 1,
      cliToken:
        'eyJpZCI6MTIxMCwiY2xpVG9rZW4iOiIxdHhrYndxMHYxa0hoenlHWmFmNTMifQ==',
      diff: 'fakeDiff',
      lessonId: 1
    }

    beforeEach(() => {
      prisma.submission.upsert = jest.fn().mockResolvedValue(submissionMock)
      prisma.lesson.findFirst = jest.fn().mockResolvedValue(null)
    })

    test('should return submission', () => {
      expect(createSubmission(null, args)).resolves.toEqual(submissionMock)
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
      expect(createSubmission(null, null)).rejects.toThrow('Invalid args')
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
      expect(acceptSubmission()).rejects.toThrow('Invalid args')
    })

    it('should throw error with no user', () => {
      const submission = { id: 1, comment: 'fake comment' }
      expect(acceptSubmission(null, submission)).rejects.toThrow('Invalid user')
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
      expect(rejectSubmission()).rejects.toThrow('Invalid args')
    })

    it('should throw error with no user', () => {
      const submission = { id: 1, comment: 'fake comment' }
      expect(rejectSubmission(null, submission)).rejects.toThrow('Invalid user')
    })
  })
})

describe('Submissions Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    hasPassedLesson.mockResolvedValue(true)
  })

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
      diff:
        'diff --git a/js1/12.js b/js1/12.js↵index e7dc26e..d0cdf56 100644↵--- a/js1/12.js↵+++ b/js1/12.js↵@@ -9,8 +9,17 @@↵  * @returns null↵  */↵ ↵-const solution = (a, fun) => {↵+const solution = (a, fun,i =0) => {↵+↵+  if(i < 2){↵+    setTimeout(()=> {↵+      b = fun()↵+      return solution(b,fun, i +1)↵+    }, a)↵+    ↵ }↵+   ↵+  }↵ ↵ module.exports = {↵   solution↵',
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
      { req: { error: jest.fn(), user: { id: 2 } } }
    )
    expect(result).toEqual([submissionResults])
  })

  it('should throw error if no user is authenticated', () => {
    expect(submissions(null, { lessonId: '2' }, null)).rejects.toThrow(
      'Invalid user'
    )
  })
})

describe('getReviewer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should throw error if reviewerId is falsy', () => {
    expect(getReviewer()).rejects.toThrow('Invalid user')
  })

  it('should return true if user has completed the lesson', () => {
    hasPassedLesson.mockResolvedValueOnce(true)
    expect(getReviewer({ id: 1 }, 1)).resolves.toBe(true)
  })

  it('should throw error if user has not completed the lesson', () => {
    hasPassedLesson.mockResolvedValueOnce(false)
    expect(getReviewer({ id: 1 }, 1)).rejects.toThrow(
      'User has not passed this lesson and cannot review.'
    )
  })
})
