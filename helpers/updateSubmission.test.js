import { SubmissionStatus } from '../graphql'
import { prisma } from '../prisma'
import { updateSubmission } from './updateSubmission'

const lessonMock = {
  id: 1,
  order: 1,
  title: 'Fake Lesson Title',
  chatUrl: 'https://fake.com/js0-fake'
}

const userMock = {
  id: 1,
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
  prisma.userLesson.update = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    prisma.submission.update = jest.fn().mockResolvedValue({
      ...submissionMock,
      lesson: lessonMock,
      user: userMock
    })
    prisma.challenge.count = jest.fn().mockResolvedValue(1)
    prisma.submission.count = jest.fn().mockResolvedValue(1)
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: '1619821939579'
    })
  })

  it('should return submission', async () => {
    await expect(updateSubmission(submission)).resolves.toEqual(submissionMock)
  })

  it('should update user lesson if student has completed it', async () => {
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: null
    })

    // mock next lesson
    prisma.lesson.findFirst = jest
      .fn()
      .mockResolvedValue({ order: 2, chatUrl: 'fakeurl/js1-nextfake' })

    await expect(updateSubmission(submission)).resolves.toEqual(submissionMock)
    expect(prisma.userLesson.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { isPassed: expect.any(String) } })
    )
  })

  it('should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
