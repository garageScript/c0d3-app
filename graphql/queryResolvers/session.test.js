jest.mock('../../helpers/dbload')
import { session } from './session'
import db from '../../helpers/dbload'

const { Submission, UserLesson, Star, User } = db

describe('Session resolver', () => {
  test('should return null if req.user does not exist', async () => {
    const req = {}
    expect(await session({}, {}, { req })).toEqual(null)
  })

  test('should return user including submissions and lessonStatus', async () => {
    const result = {
      user: { username: 'test', id: 815 },
      submissions: { id: '1' },
      lessonStatus: { id: '1', lessonId: 4, starGiven: 'jobless' }
    }
    const req = { user: { ...result.user } }
    Submission.findAll = jest.fn().mockReturnValue([{ ...result.submissions }])
    UserLesson.findAll = jest.fn().mockReturnValue([{ ...result.lessonStatus }])
    Star.findAll = jest
      .fn()
      .mockReturnValue([
        { dataValues: { mentorId: 3, studentId: 815, lessonId: 4 } }
      ])
    User.findAll = jest
      .fn()
      .mockReturnValue([{ dataValues: { id: 3, username: 'jobless' } }])
    const returnValue = await session({}, {}, { req })

    expect(returnValue.user).toEqual(result.user)
    expect(returnValue.submissions).toEqual([result.submissions])
    expect(returnValue.lessonStatus).toEqual([result.lessonStatus])
  })
})
