jest.mock('./discordBot')
import { SubmissionStatus } from '../graphql'
import { prisma } from '../prisma'
import { updateSubmission } from './updateSubmission'
import { sendLessonChannelMessage } from './discordBot'

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

  it('should update user lesson if student has completed it and notify on discord', async () => {
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: null
    })

    // mock next lesson
    const nextLesson = { order: 2, id: 2 }
    prisma.lesson.findFirst = jest.fn().mockResolvedValue(nextLesson)

    await expect(updateSubmission(submission)).resolves.toEqual(submissionMock)
    expect(prisma.userLesson.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { isPassed: expect.any(String) } })
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
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: null
    })

    // mock next lesson
    prisma.lesson.findFirst = jest.fn().mockResolvedValue(null)

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
