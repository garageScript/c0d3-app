jest.mock('../../helpers/controllers/userInfoController')
import { userInfo } from '../../helpers/controllers/userInfoController'
import { session } from './session'
import { prisma } from '../../prisma'

describe('Session resolver', () => {
  test('should return empty session if req.user does not exist', async () => {
    const req = {}
    expect(await session({}, {}, { req })).toEqual({ lessonStatus: [] })
  })

  test('should return user including submissions and lessonStatus', async () => {
    const userInfoData = {
      user: { id: 815, username: 'test' },
      submissions: [{ id: 1 }],
      lessonStatus: [
        { id: 1, lessonId: 4 },
        { id: 2, lessonId: 666 }
      ]
    }
    const sessionData = {
      ...userInfoData,
      lessonStatus: [
        { id: 1, lessonId: 4, starGiven: 'superReviewer' },
        { id: 2, lessonId: 666, starGiven: '' }
      ]
    }
    const req = { user: userInfoData.user }
    userInfo.mockReturnValue(userInfoData)
    prisma.star.findMany = jest
      .fn()
      .mockReturnValue([{ mentor: { username: 'superReviewer' }, lessonId: 4 }])
    const sessionReturnValue = await session(
      {},
      {},
      { req: { user: { id: 815, username: 'test' } } }
    )

    expect(sessionReturnValue).toEqual(sessionData)
  })
})
