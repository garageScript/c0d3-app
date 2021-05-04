jest.mock('./mattermost')
import { SubmissionStatus } from '../graphql'
import { prisma } from '../prisma'
import {
  getUserByEmail,
  publicChannelMessage,
  sendDirectMessage
} from './mattermost'
import { sendChatNotification, updateSubmission } from './updateSubmission'

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
    getUserByEmail.mockResolvedValue({ id: 'fakeid', username: 'fakeusername' })
  })

  it('should return submission', () => {
    expect(updateSubmission(submission)).resolves.toEqual(submissionMock)
  })

  it('should update user lesson and notify mattermost', async () => {
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: null
    })

    // mock mattermost username
    getUserByEmail.mockReturnValue({ username: 'fakeusername' })
    // mock next lesson
    prisma.lesson.findFirst = jest
      .fn()
      .mockResolvedValue({ order: 2, chatUrl: 'fakeurl/js1-nextfake' })

    await expect(updateSubmission(submission)).resolves.toEqual(submissionMock)

    expect(publicChannelMessage).toHaveBeenCalledTimes(2)
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js0-fake',
      'Congratulations to @fakeusername for passing and completing Fake Lesson Title! @fakeusername is now a guardian angel for the students in this channel.'
    )
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js1-nextfake',
      'We have a new student joining us! @fakeusername just completed Fake Lesson Title.'
    )
  })

  it("should not crash when lesson chaturl doesn't exist", async () => {
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: null
    })
    // mock mattermost username
    getUserByEmail.mockReturnValue({ username: 'fakeusername' })
    // mock lesson
    prisma.submission.update = jest.fn().mockResolvedValue({
      ...submissionMock,
      lesson: { chatUrl: null, order: 1, title: 'Fake Lesson Title' },
      user: userMock
    })
    // mock next lesson
    prisma.lesson.findFirst = jest
      .fn()
      .mockResolvedValue({ order: 2, chatUrl: 'fakeurl/js1-nextfake' })

    await updateSubmission(submission)
    expect(publicChannelMessage).toHaveBeenCalledTimes(1)
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js1-nextfake',
      'We have a new student joining us! @fakeusername just completed Fake Lesson Title.'
    )
  })

  it("should not crash when next lesson chaturl doesn't exist", async () => {
    prisma.userLesson.upsert = jest.fn().mockResolvedValue({
      isPassed: null
    })
    // mock mattermost username
    getUserByEmail.mockReturnValue({ username: 'fakeusername' })
    // mock next lesson
    prisma.lesson.findFirst = jest
      .fn()
      .mockReturnValue({ order: 2, chatUrl: null })

    await updateSubmission(submission)
    expect(publicChannelMessage).toHaveBeenCalledTimes(1)
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js0-fake',
      'Congratulations to @fakeusername for passing and completing Fake Lesson Title! @fakeusername is now a guardian angel for the students in this channel.'
    )
  })
  it('should throw error Invalid args', () => {
    expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})

describe('sendChatNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Should send submission accepted notification', async () => {
    getUserByEmail.mockReturnValue(submissionMock.reviewer)
    await sendChatNotification({ submission: submissionMock, userChatId: '1' })
    expect(sendDirectMessage).toHaveBeenCalledWith(
      '1',
      `Your submission for the challenge **_${submissionMock.challenge.title}_** has been **ACCEPTED** by @${submissionMock.reviewer.username}.` +
        `\n\nThe reviewer left the following comment:\n\n___\n\n${submissionMock.comment}`
    )
  })

  it('Should send submission rejected notification', async () => {
    const submission = { ...submissionMock }
    submission.status = SubmissionStatus.NeedMoreWork
    getUserByEmail.mockReturnValue(submissionMock.reviewer)
    await sendChatNotification({ submission, userChatId: '1' })
    expect(sendDirectMessage).toHaveBeenCalledWith(
      '1',
      `Your submission for the challenge **_${submissionMock.challenge.title}_** has been **REJECTED** by @${submissionMock.reviewer.username}.` +
        `\n\nThe reviewer left the following comment:\n\n___\n\n${submissionMock.comment}`
    )
  })

  it('Should not include comment if the comment is null', async () => {
    const submission = { ...submissionMock }
    submission.comment = null
    getUserByEmail.mockReturnValue(submissionMock.reviewer)
    await sendChatNotification({ submission, userChatId: '1' })
    expect(sendDirectMessage).toHaveBeenCalledWith(
      '1',
      `Your submission for the challenge **_${submissionMock.challenge.title}_** has been **ACCEPTED** by @${submissionMock.reviewer.username}.`
    )
  })

  it('Should return immediately if reviewer is null', async () => {
    const submission = { ...submissionMock }
    submission.reviewer = null
    await sendChatNotification({ submission })
    expect(sendDirectMessage).not.toHaveBeenCalled()
  })
})
