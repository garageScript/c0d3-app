import React from 'react'
import ConnectToDiscordSuccess from '../../../pages/discord/success'
import { render } from '@testing-library/react'
jest.mock('next-connect')
jest.mock('../../helpers/discordAuth')
jest.mock('../../helpers/middleware/user')
jest.mock('../../helpers/middleware/session')

import {
  getDiscordUserInfo,
  setTokenFromAuthCode
} from '../../../helpers/discordAuth'

const mockDiscordUserInfo = {
  userId: 'discord123',
  username: 'discord-fakeuser',
  avatarUrl:
    'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
  refreshToken: 'fakeRefreshToken'
}

describe('connect to Discord success page', () => {
  it('should render success page if auth flow succeeded', () => {
    const { container } = render(<ConnectToDiscordSuccess />)
    expect(container).toMatchSnapshot()
  })
  it('should throw error if user not logged in', async () => {
    await getHandler[1]({}, mockErrorResponse)
    expect(mockErrorResponse.status).toHaveBeenCalledWith(403)
    expect(mockErrorResponse.json).toHaveBeenCalledWith({
      error: 'user not logged in'
    })
  })

  it('return discord user info if valid refresh token', async () => {
    setTokenFromAuthCode.mockResolvedValue({
      id: 123
    })
    getDiscordUserInfo.mockResolvedValue(mockDiscordUserInfo)
    await getHandler[1](
      { query: { code: 'fakeAuthCode' }, user: { id: 123 } },
      {
        json: userInfo => {
          expect(userInfo).toBe(mockDiscordUserInfo)
        }
      }
    )
    expect(setTokenFromAuthCode).toBeCalledWith(123, 'fakeAuthCode')
  })
})
