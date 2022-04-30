/**
 * @jest-environment node
 */

jest.mock('./userInfoController')
import { userInfo } from './userInfoController'
import prismaMock from '../../__tests__/utils/prismaMock'
import { session } from './session'

describe('Session resolver', () => {
  test('should return empty session if req.user does not exist', () => {
    return expect(session({}, {}, { req: {} })).resolves.toEqual({
      lessonStatus: []
    })
  })

  test('should return user including submissions and lessonStatus', async () => {
    const userInfoData = {
      user: { id: 815, username: 'test', discordRefreshToken: 'valid' },
      submissions: [{ id: 1 }],
      lessonStatus: [
        { id: 1, lessonId: 4 },
        { id: 2, lessonId: 666 }
      ]
    }
    const sessionData = {
      ...userInfoData,
      user: {
        id: 815,
        username: 'test',
        discordRefreshToken: 'valid',
        isConnectedToDiscord: true
      },
      lessonStatus: [
        { id: 1, lessonId: 4, starGiven: 'superReviewer' },
        { id: 2, lessonId: 666, starGiven: '' }
      ]
    }
    userInfo.mockResolvedValue(userInfoData)
    prismaMock.star.findMany.mockResolvedValue([
      { mentor: { username: 'superReviewer' }, lessonId: 4 }
    ])
    const sessionReturnValue = await session(
      {},
      {},
      { req: { user: userInfoData.user } }
    )

    expect(sessionReturnValue).toEqual(sessionData)
  })
})
