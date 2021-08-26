jest.mock('next-connect')
jest.mock('../../../helpers/discordAuth')
import nextConnect from 'next-connect'
import {
  getTokenFromAuthCode,
  getUserInfoFromRefreshToken
} from '../../../helpers/discordAuth'

const redirectUrlWithAuthCode =
  'https://www.mockc0d3.com/api/auth/callback/discord?code=wgHnpXFIoYpOnDYavFSftP91X2ubow'

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

nextConnect.mockImplementation(returnHandler)

require('../../../pages/api/auth/callback/discordOAuthHandler')

describe('discord redirect with auth code query parameter', () => {
  beforeEach(() => {
  })

  it('should put request handler to the correct url', () => {
    // require('../../../pages/api/auth/callback/discordOAuthHandler')
    expect(getFn.mock.calls[0][0]).toEqual('/api/auth/callback/discord')
  })

  it('return discord user info if valid refresh token', async () => {
    // require('../../../pages/api/auth/callback/discordOAuthHandler')
    getTokenFromAuthCode.mockResolvedValue({
      refresh_token: 'fakeRefreshToken'
    })
    getUserInfoFromRefreshToken.mockResolvedValue(mockDiscordUserInfo)
    console.log('getFn called n times', getFn.mock.calls.length)
    await getFn.mock.calls[0][1](
      { query: { code: 'fakeAuthCode' } },
      {
        json: userInfo => {
          expect(userInfo).toBe(mockDiscordUserInfo)
        }
      }
    )
    expect(getTokenFromAuthCode).toBeCalledWith('fakeAuthCode')
  })

  it('should throw error if refresh token invalid', async () => {
    const mockResponse = { json: () => 'refresh token invalid for userId 123' }
  })
})
