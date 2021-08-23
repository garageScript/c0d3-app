/**
 * @jest-environment node
 */

jest.mock('./discordBot')
import { SubmissionStatus } from '../graphql'
import prismaMock from '../__tests__/utils/prismaMock'
import { sendLessonChannelMessage } from './discordBot'
import { updateSubmission } from './updateSubmission'

const lessonMock = {
  id: 1,
  order: 1,
  title: 'Fake Lesson Title',
  chatUrl: 'https://fake.com/js0-fake'
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

const submissionMock = {
  ...submission,
  challenge: {
    id: 1,
    title: 'Fake challenge'
  },
  reviewer: {
    email: 'fake@email.com',
    username: 'leetcoder'
  }
}

describe('updateSubmission', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prismaMock.submission.update.mockImplementation(args =>
      Promise.resolve({
        ...submissionMock,
        lesson: lessonMock,
        user: userMock,
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

  it('should update user lesson if student has completed it and notify on discord', async () => {
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
    expect(sendLessonChannelMessage).toHaveBeenCalledWith(
      submissionMock.lessonId,
      'Congratulations to **fakeusername** for passing and completing **_Fake Lesson Title_** ! **fakeusername** is now a guardian angel for the students in this channel.'
    )
    expect(sendLessonChannelMessage).toHaveBeenCalledWith(
      nextLesson.id,
      'We have a new student joining us! **fakeusername** just completed **_Fake Lesson Title_** !'
    )
  })

  it('should not notify next lesson if does not exist', async () => {
    prismaMock.userLesson.upsert.mockResolvedValue({
      passedAt: null
    })

    // mock next lesson
    prismaMock.lesson.findFirst.mockResolvedValue(null)

    await updateSubmission(submission)

    expect(sendLessonChannelMessage).toHaveBeenCalledTimes(1)
    expect(sendLessonChannelMessage).toHaveBeenCalledWith(
      submissionMock.lessonId,
      'Congratulations to **fakeusername** for passing and completing **_Fake Lesson Title_** ! **fakeusername** is now a guardian angel for the students in this channel.'
    )
  })

  it('should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
