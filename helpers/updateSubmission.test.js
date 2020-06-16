jest.mock('./dbload')
jest.mock('./mattermost')
import db from './dbload'
import { updateSubmission } from './updateSubmission'
import { publicChannelMessage, getUserByEmail } from './mattermost'

const { Challenge, Submission, User, UserLesson, Lesson } = db

describe('updateSubmission', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return submission', async () => {
    const setStub = jest.fn()
    const saveStub = jest.fn()

    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: setStub,
      save: saveStub
    }

    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'not passed' } // don't update userlesson
    ]

    // mock submission
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    // mock number of challenges in lesson
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    // mock all submissions in lesson
    Submission.findAll = jest.fn().mockReturnValue(submissions)

    const result = await updateSubmission(submission)

    expect(setStub).toHaveBeenCalledWith('reviewerId', 2)
    expect(setStub).toHaveBeenCalledWith('status', 'fake status')
    expect(setStub).toHaveBeenCalledWith('comment', 'fake comment')
    expect(saveStub).toHaveBeenCalled()
    expect(result).toEqual(submission)
  })

  test('should update user lesson', async () => {
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: () => {},
      save: () => {}
    }

    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' } // update userlesson
    ]

    const setStub = jest.fn()
    const saveStub = jest.fn()

    const userLesson = {
      lessonId: 1,
      isPassed: true, // don't notify mattermost
      set: setStub,
      save: saveStub
    }

    // mock submission
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    // mock number of challenges in lesson
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    // mock all submission in lesson
    Submission.findAll = jest.fn().mockReturnValue(submissions)
    // mock submission user
    User.findByPk = jest.fn().mockReturnValue({ email: 'fake email' })
    // mock userlesson
    UserLesson.findOrCreate = jest.fn().mockReturnValue([userLesson])

    const result = await updateSubmission(submission)

    expect(setStub).toHaveBeenCalledWith('isPassed', expect.any(String))
    expect(setStub).toHaveBeenCalledWith('isTeaching', expect.any(String))
    expect(saveStub).toHaveBeenCalled()
    expect(result).toEqual(submission)
  })

  test('should notify mattermost', async () => {
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: () => {},
      save: () => {}
    }

    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' } // update userlesson
    ]

    const userLesson = {
      lessonId: 1,
      isPassed: false, // notify mattermost
      set: () => {},
      save: () => {}
    }

    // mock submission
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    // mock number of challenges in lesson
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    // mock all submission in lesson
    Submission.findAll = jest.fn().mockReturnValue(submissions)
    // mock submission user
    User.findByPk = jest.fn().mockReturnValue({ email: 'fake email' })
    // mock userlesson
    UserLesson.findOrCreate = jest.fn().mockReturnValue([userLesson])
    // mock lesson data
    Lesson.findByPk = jest.fn().mockReturnValue({
      order: 1,
      chatUrl: 'fakeurl/js0-fake',
      title: 'Fake Lesson Title'
    })
    // mock mattermost username
    getUserByEmail.mockReturnValue('fakeusername')
    // mock next lesson
    Lesson.findOne = jest
      .fn()
      .mockReturnValue({ order: 2, chatUrl: 'fakeurl/js1-nextfake' })

    const result = await updateSubmission(submission)

    expect(publicChannelMessage).toHaveBeenCalledTimes(2)
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js0-fake',
      'Congratulations to @fakeusername for passing and completing Fake Lesson Title! @fakeusername is now a guardian angel for the students in this channel.'
    )
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js1-nextfake',
      'We have a new student joining us! @fakeusername just completed Fake Lesson Title.'
    )
    expect(result).toEqual(submission)
  })

  test("should not crash when lesson chaturl doesn't exist", async () => {
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: () => {},
      save: () => {}
    }

    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' } // update userlesson
    ]

    const userLesson = {
      lessonId: 1,
      isPassed: false, // notify mattermost
      set: () => {},
      save: () => {}
    }

    // mock submission
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    // mock number of challenges in lesson
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    // mock all submission in lesson
    Submission.findAll = jest.fn().mockReturnValue(submissions)
    // mock submission user
    User.findByPk = jest.fn().mockReturnValue({ email: 'fake email' })
    // mock userlesson
    UserLesson.findOrCreate = jest.fn().mockReturnValue([userLesson])
    // mock lesson data
    Lesson.findByPk = jest.fn().mockReturnValue({
      order: 1,
      chatUrl: null,
      title: 'Fake Lesson Title'
    })
    // mock mattermost username
    getUserByEmail.mockReturnValue('fakeusername')
    // mock next lesson
    Lesson.findOne = jest
      .fn()
      .mockReturnValue({ order: 2, chatUrl: 'fakeurl/js1-nextfake' })

    const result = await updateSubmission(submission)

    expect(publicChannelMessage).toHaveBeenCalledTimes(1)
    expect(publicChannelMessage).toHaveBeenCalledWith(
      'js1-nextfake',
      'We have a new student joining us! @fakeusername just completed Fake Lesson Title.'
    )
    expect(result).toEqual(submission)
  })

  test("should not crash when next lesson doesn't exist", async () => {
    const submission = {
      id: 1,
      comment: 'fake comment',
      status: 'fake status',
      reviewerId: 2,
      set: () => {},
      save: () => {}
    }

    const submissions = [
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' },
      { status: 'passed' } // update userlesson
    ]

    const userLesson = {
      lessonId: 1,
      isPassed: false, // notify mattermost
      set: () => {},
      save: () => {}
    }

    // mock submission
    Submission.findByPk = jest.fn().mockReturnValue(submission)
    // mock number of challenges in lesson
    Challenge.count = jest.fn().mockReturnValue(submissions.length)
    // mock all submission in lesson
    Submission.findAll = jest.fn().mockReturnValue(submissions)
    // mock submission user
    User.findByPk = jest.fn().mockReturnValue({ email: 'fake email' })
    // mock userlesson
    UserLesson.findOrCreate = jest.fn().mockReturnValue([userLesson])
    // mock lesson data
    Lesson.findByPk = jest.fn().mockReturnValue({
      order: 1,
      chatUrl: null,
      title: 'Fake Lesson Title'
    })
    // mock mattermost username
    getUserByEmail.mockReturnValue('fakeusername')
    // mock next lesson
    Lesson.findOne = jest.fn().mockReturnValue(null)

    const result = await updateSubmission(submission)

    expect(result).toEqual(submission)
  })

  test('should throw error Invalid args', async () => {
    await expect(updateSubmission()).rejects.toThrow('Invalid args')
  })
})
