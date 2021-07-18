import {
  getTokenFromAuthCode,
  getUserInfoFromRefreshToken
} from './discordAuth'
import { prisma } from '../prisma'
import { tokenResponse, userInfoResponse, userInfo } from '../__dummy__/discordOAuthData'

describe('getUserInfoFromRefreshToken function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const userUpdateFn = (prisma.user.update = jest.fn())
  it('should update refresh token in database if refresh token invalid', async () => {
    await expect(
      getUserInfoFromRefreshToken(1, 'mockRefreshToken')
    ).rejects.toThrow('refresh token invalid')
    expect(userUpdateFn).toBeCalled()
  })

  it('should return user info if refresh token valid', async () => {
    const getTokenFromRefreshToken = jest.fn().mockResolvedValue(tokenResponse)
    const getUserInfo = jest.fn().mockResolvedValue(userInfoResponse)
    const mockUserInfo = await getUserInfoFromRefreshToken(1, 'mockRefreshToken')
    expect(mockUserInfo).toBe(userInfo)
    expect(getTokenFromRefreshToken).toBeCalled()
    expect(getUserInfo).toBeCalled()
    expect(userUpdateFn).toBeCalled()
  })
})
