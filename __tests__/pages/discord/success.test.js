import React from 'react'
import { render } from '@testing-library/react'
jest.mock('next-connect')
jest.mock('../../helpers/discordAuth')
jest.mock('../../helpers/middleware/user')
jest.mock('../../helpers/middleware/session')
jest.mock('../../helpers/middleware/logger')

import {
  getDiscordUserInfo,
  setTokenFromAuthCode
} from '../../../helpers/discordAuth'

import { USER_NOT_LOGGED_IN, DISCORD_ERROR, ConnectToDiscordSuccess } from '../../pages/discord/success'

const mockDiscordUserInfo = {
  userId: 'discord123',
  username: 'discord-fakeuser',
  avatarUrl:
    'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
  refreshToken: 'fakeRefreshToken'
}

const userNotLoggedInErrorProps = {
  errorCode: USER_NOT_LOGGED_IN
}

const discordErrorProps = {
  error: '',
  errorCode: DISCORD_ERROR,
  username: 'fakeUser'
}

const successfulAuthFlowProps = {
  userInfo: mockDiscordUserInfo,
  username: 'fakeUser'
}

describe('getServerSideProps', () => {
  it('should return error if user not logged in', (() => {

  })

  it('should return error if userInfo could not be retrieved', () => {

  })

  it('should return error if auth code is invalid', () => {
    
  })

  it('should return username and userInfo if auth code is valid and userInfo is successfully retrieved', () => {
    setTokenFromAuthCode.mockResolvedValue({
      id: 123
    })
    getDiscordUserInfo.mockResolvedValue(mockDiscordUserInfo)
    const response = await getServerSideProps({
      req: {
        user: {
          id: 'fakeUser'
        }
      },
      query: 'validQueryString'
    })
    expect(setTokenFromAuthCode).toBeCalledWith(123, 'fakeAuthCode')

  })
})

describe('connect to Discord success page', () => {
  it('should render success page if auth flow succeeded', () => {
    const { container } = render(<ConnectToDiscordSuccess />)
    expect(container).toMatchSnapshot()
  })

  it('should render user not logged in page if user not logged in', async () => {
    const { container } = render(<ConnectToDiscordSuccess />)
  })

  it('should render discord error page if auth code is invalid or no userInfo is returned', async () => {
    const { container } = render(<ConnectToDiscordSuccess />)
  })
})
