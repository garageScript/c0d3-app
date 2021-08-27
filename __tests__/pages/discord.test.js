jest.mock('next-connect')
jest.mock('../../helpers/discordAuth')
jest.mock('../../helpers/middleware/user')
jest.mock('../../helpers/middleware/session')
jest.mock('../../helpers/middleware/logger')

import nextConnect from 'next-connect'
import {
  getTokenFromAuthCode,
  getUserInfoFromRefreshToken
} from '../../helpers/discordAuth'

const mockDiscordUserInfo = {
  userId: 'discord123',
  username: 'discord-fakeuser',
  avatarUrl:
    'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
  refreshToken: 'fakeRefreshToken'
}

const getFn = jest.fn()

const returnHandler = () => {
  return {
    use: returnHandler,
    get: getFn
  }
}

describe('discord redirect with auth code query parameter', () => {
  let getHandler
  let mockErrorResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  beforeAll(() => {
    nextConnect.mockImplementation(returnHandler)
    require('../../pages/api/auth/callback/discord')
    getHandler = getFn.mock.calls[0]
  })

  it('should put request handler to the correct url', () => {
    expect(getHandler[0]).toEqual('/api/auth/callback/discord')
  })

  it('should throw error if user not logged in', async () => {
    await getHandler[1]({}, mockErrorResponse)
    expect(mockErrorResponse.status).toHaveBeenCalledWith(403)
    expect(mockErrorResponse.json).toHaveBeenCalledWith({
      error: 'user not logged in'
    })
  })

  it('return discord user info if valid refresh token', async () => {
    getTokenFromAuthCode.mockResolvedValue({
      refresh_token: 'fakeRefreshToken'
    })
    getUserInfoFromRefreshToken.mockResolvedValue(mockDiscordUserInfo)
    await getHandler[1](
      { query: { code: 'fakeAuthCode' }, user: { userId: '123' } },
      {
        json: userInfo => {
          expect(userInfo).toBe(mockDiscordUserInfo)
        }
      }
    )
    expect(getTokenFromAuthCode).toBeCalledWith('fakeAuthCode')
  })

  it('should throw error if auth token invalid', async () => {
    getTokenFromAuthCode.mockRejectedValue({})
    await getHandler[1](
      { query: { code: 'fakeAuthCode' }, user: { userId: '123' } },
      mockErrorResponse
    )

    expect(mockErrorResponse.status).toHaveBeenCalledWith(400)
    expect(mockErrorResponse.json).toHaveBeenCalledWith({
      error: 'invalid auth code'
    })
  })
})
