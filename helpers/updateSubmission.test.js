/**
 * @jest-environment node
 */

jest.mock('./discordBot')

import {
  C0D3_ICON_URL,
  CURRICULUM_URL,
  getLessonCoverPNG,
  PRIMARY_COLOR_HEX,
  PROFILE_URL
} from '../constants'
import { SubmissionStatus } from '../graphql'
import prismaMock from '../__tests__/utils/prismaMock'
import { sendDirectMessage, sendLessonChannelMessage } from './discordBot'
import { updateSubmission } from './updateSubmission'

const lessonMock = {
  id: 1,
  order: 1,
  title: 'Fake Lesson Title',
  slug: 'js1'
}

const userMock = {
  id: 1,
  username: 'fakeusername',
  email: 'fake@email.com'
}
const submission = {
  id: 1,
  diff: 'fakeDiff',
  comment: 'fake comment',
  status: SubmissionStatus.Passed,
  reviewerId: 2,
  lessonId: 1
}

const reviewerMock = {
  name: 'Leet Coder',
  email: 'fake@email.com',
  username: 'leetcoder'
}

const submissionMock = {
  ...submission,
  challenge: {
    id: 1,
    title: 'Fake challenge'
  },
  reviewer: reviewerMock,
  user: userMock,
  lesson: lessonMock
}

const getNotificationEmbedMock = (
  submission,
  reviewerString,
  comment = null
) => ({
  color: PRIMARY_COLOR_HEX,
  title: 'Submission Reviewed',
  url: `${CURRICULUM_URL}/js1`,
  thumbnail: {
    url: getLessonCoverPNG(1)
  },
  author: {
    name: 'Leet Coder',
    url: `${PROFILE_URL}/leetcoder`,
    icon_url: C0D3_ICON_URL
  },
  description: `${reviewerString} reviewed your submission to the challenge **Fake challenge**, they _**${
    submission.status === SubmissionStatus.Passed
      ? 'accepted it!'
      : 'requested some changes.'
  }**_`,
  ...(comment && {
    fields: [
      {
        name: 'They left the following comment',
        value: comment
      }
    ]
  })
})

describe('updateSubmission', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prismaMock.submission.update.mockImplementation(args =>
      Promise.resolve({
        ...submissionMock,
        ...args.data
      })
    )
    prismaMock.challenge.count.mockResolvedValue(1)
    prismaMock.submission.findMany.mockResolvedValue([{ challengeId: 1 }])
    prismaMock.userLesson.upsert.mockResolvedValue({
      passedAt: new Date()
    })
  })

  it('should return submission', async () => {
    await expect(updateSubmission(submission)).resolves.toEqual(submissionMock)
  })

  it('should update user lesson if student has completed it', async () => {
    prismaMock.userLesson.upsert.mockResolvedValue({
      passedAt: null
    })

    // mock next lesson
    const nextLesson = { order: 2, id: 2 }
    prismaMock.lesson.findFirst.mockResolvedValue(nextLesson)

    await expect(updateSubmission(submission)).resolves.toEqual(submissionMock)
    expect(prismaMock.userLesson.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { passedAt: expect.any(Date) } })
    )

    expect(sendLessonChannelMessage).toHaveBeenCalledTimes(2)
    expect(sendLessonChannelMessage).toHaveBeenNthCalledWith(
      1,
      submissionMock.lessonId,
      'Congratulations to **fakeusername** for passing and completing **_Fake Lesson Title_** ! They are now a guardian angel for the students in this channel.'
    )
    expect(sendLessonChannelMessage).toHaveBeenNthCalledWith(
      2,
      nextLesson.id,
      'We have a new student joining us! **fakeusername** just completed **_Fake Lesson Title_** !'
    )
  })

  describe('should send required messages to discord', () => {
    it("should notify the lesson's channel of new submission", async () => {
      prismaMock.userLesson.upsert.mockResolvedValue({
        passedAt: null
      })

      await updateSubmission(submission)

      expect(sendLessonChannelMessage).toHaveBeenCalledWith(
        submissionMock.lessonId,
        'Congratulations to **fakeusername** for passing and completing **_Fake Lesson Title_** ! They are now a guardian angel for the students in this channel.'
      )
    })

    it("should notify the next lesson's channel too channel if it exists", async () => {
      prismaMock.userLesson.upsert.mockResolvedValue({
        passedAt: null
      })

      // mock next lesson
      const nextLesson = { order: 2, id: 2 }
      prismaMock.lesson.findFirst.mockResolvedValue(nextLesson)

      await updateSubmission(submission)

      expect(sendLessonChannelMessage).toHaveBeenCalledTimes(2)
      expect(sendLessonChannelMessage.mock.calls[1]).toEqual([
        nextLesson.id,
        'We have a new student joining us! **fakeusername** just completed **_Fake Lesson Title_** !'
      ])
    })

    describe('if user has their discord account connected', () => {
      it("should notify the lesson's channel of new submission", async () => {
        prismaMock.submission.update.mockImplementation(args =>
          Promise.resolve({
            ...submissionMock,
            user: { ...userMock, discordId: 'fakeId' },
            ...args.data
          })
        )

        prismaMock.userLesson.upsert.mockResolvedValue({
          passedAt: null
        })

        await updateSubmission(submission)

        expect(sendLessonChannelMessage).toHaveBeenCalledWith(
          submissionMock.lessonId,
          'Congratulations to <@fakeId> for passing and completing **_Fake Lesson Title_** ! They are now a guardian angel for the students in this channel.'
        )
      })

      it('should message user their submission status if accepted', async () => {
        prismaMock.submission.update.mockImplementation(args =>
          Promise.resolve({
            ...submissionMock,
            user: { ...userMock, discordId: 'fakeId' },
            ...args.data
          })
        )

        await updateSubmission(submission)

        expect(sendDirectMessage).toHaveBeenCalledWith(
          'fakeId',
          '',
          getNotificationEmbedMock(submission, '**leetcoder**', 'fake comment')
        )
      })

      it('should message user their submission status if rejected', async () => {
        prismaMock.submission.update.mockImplementation(args =>
          Promise.resolve({
            ...submissionMock,
            status: SubmissionStatus.NeedMoreWork,
            user: { ...userMock, discordId: 'fakeId' },
            ...args.data
          })
        )

        await updateSubmission({
          ...submission,
          status: SubmissionStatus.NeedMoreWork
        })

        expect(sendDirectMessage).toHaveBeenCalledWith(
          'fakeId',
          '',
          getNotificationEmbedMock(
            { ...submission, status: SubmissionStatus.NeedMoreWork },
            '**leetcoder**',
            'fake comment'
          )
        )
      })

      it('should not include a comment field in the message to user if there is no comment', async () => {
        prismaMock.submission.update.mockImplementation(args =>
          Promise.resolve({
            ...submissionMock,
            comment: null,
            user: { ...userMock, discordId: 'fakeId' },
            ...args.data
          })
        )

        await updateSubmission({ ...submission, comment: null })

        expect(sendDirectMessage).toHaveBeenCalledWith(
          'fakeId',
          '',
          getNotificationEmbedMock(
            { ...submission, comment: null },
            '**leetcoder**'
          )
        )
      })

      it("should mention the reviewer's discord id if their discord is connected", async () => {
        prismaMock.submission.update.mockImplementation(args =>
          Promise.resolve({
            ...submissionMock,
            user: { ...userMock, discordId: 'fakeId' },
            reviewer: { ...reviewerMock, discordId: 'fakeReviewerId' },
            ...args.data
          })
        )

        await updateSubmission(submission)

        expect(sendDirectMessage).toHaveBeenCalledWith(
          'fakeId',
          '',
          getNotificationEmbedMock(
            submission,
            '<@fakeReviewerId>',
            'fake comment'
          )
        )
      })

      it("should mention the reviewer's c0d3 username if their discord is not connected", async () => {
        prismaMock.submission.update.mockImplementation(args =>
          Promise.resolve({
            ...submissionMock,
            user: { ...userMock, discordId: 'fakeId' },
            ...args.data
          })
        )

        await updateSubmission(submission)

        expect(sendDirectMessage).toHaveBeenCalledWith(
          'fakeId',
          '',
          getNotificationEmbedMock(submission, '**leetcoder**', 'fake comment')
        )
      })
    })
  })

  it('should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
