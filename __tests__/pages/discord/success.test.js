jest.mock('../../../helpers/discordAuth')

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { getDiscordUserInfo } from '../../../helpers/discordAuth'
import prismaMock from '../../../__tests__/utils/prismaMock'

import {
  ErrorCode,
  ConnectToDiscordSuccess,
  getServerSideProps
} from '../../../pages/discord/success'
import { getSession } from 'next-auth/react'

const mockDiscordUserInfo = {
  userId: 'discord123',
  username: 'discord-fakeuser',
  avatarUrl:
    'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
  refreshToken: 'fakeRefreshToken'
}

const userNotLoggedInErrorProps = {
  props: {
    errorCode: ErrorCode.USER_NOT_LOGGED_IN
  }
}

const differentAccountIsConnectedProps = {
  props: {
    errorCode: ErrorCode.DIFFERENT_ACCOUNT_IS_CONNECTED
  }
}

const discordErrorProps = {
  props: {
    errorCode: ErrorCode.DISCORD_ERROR
  }
}

const successfulAuthFlowProps = {
  props: {
    userInfo: mockDiscordUserInfo,
    username: mockDiscordUserInfo.username
  }
}

getSession.mockResolvedValue({ user: { ...mockDiscordUserInfo } })

describe('getServerSideProps function', () => {
  it('should return error if user not logged in', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null)

    getSession.mockResolvedValueOnce(null)
    const response = await getServerSideProps({
      req: {}
    })
    expect(response).toEqual(userNotLoggedInErrorProps)
  })

  it('should return error if other account is connected to discord', async () => {
    const response = await getServerSideProps({
      req: {},
      query: {
        error: 'connected'
      }
    })
    expect(response).toEqual(differentAccountIsConnectedProps)
  })

  it('should return error if userInfo could not be retrieved from Discord', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({ id: 123 })

    getSession.mockResolvedValueOnce({
      user: {
        id: 123
      }
    })

    getDiscordUserInfo.mockResolvedValueOnce({})
    const response = await getServerSideProps({
      req: {}
    })
    expect(response).toEqual(discordErrorProps)
  })

  it('should return error if user could not be retrieved from database', async () => {
    prismaMock.user.findFirst.mockResolvedValue(null)

    getDiscordUserInfo.mockResolvedValue({})
    const response = await getServerSideProps({
      req: {}
    })
    expect(response).toEqual(userNotLoggedInErrorProps)
  })

  it('should return username and userInfo if userInfo is successfully retrieved', async () => {
    prismaMock.user.findFirst.mockResolvedValue(mockDiscordUserInfo)

    getDiscordUserInfo.mockResolvedValue(mockDiscordUserInfo)
    const response = await getServerSideProps({
      req: {}
    })
    expect(response).toEqual(successfulAuthFlowProps)
  })
})

describe('connect to Discord success page', () => {
  it('should render success page if auth flow succeeded', async () => {
    render(
      <ConnectToDiscordSuccess
        username="fakeUser"
        userInfo={mockDiscordUserInfo}
      />
    )
    await waitFor(() =>
      expect(
        screen.getByText('fakeUser, you are now connected to Discord!', {
          exact: true
        })
      ).toBeTruthy()
    )
  })

  it('should render user not logged in page if user not logged in', async () => {
    render(<ConnectToDiscordSuccess errorCode={ErrorCode.USER_NOT_LOGGED_IN} />)
    await waitFor(() =>
      expect(
        screen.getByText('You need to be logged in to connect to Discord.', {
          exact: true
        })
      ).toBeTruthy()
    )
  })

  it('should render discord account already used page', async () => {
    render(
      <ConnectToDiscordSuccess
        errorCode={ErrorCode.DIFFERENT_ACCOUNT_IS_CONNECTED}
      />
    )
    await waitFor(() =>
      expect(
        screen.getByText('Discord account is already used', {
          exact: true
        })
      ).toBeTruthy()
    )
  })

  it('should render discord error page when no userInfo is returned', async () => {
    render(
      <ConnectToDiscordSuccess
        username="fakeUser"
        errorCode={ErrorCode.DISCORD_ERROR}
        error={{ message: 'errorMessage' }}
      />
    )
    await waitFor(() => {
      expect(
        screen.getByText(
          'Dear fakeUser, we had trouble connecting to Discord, please try again.',
          {
            exact: true
          }
        )
      ).toBeTruthy()
      expect(screen.getByText('{ "message": "errorMessage" }')).toBeTruthy()
    })
  })

  it('should render discord error page if auth code is invalid or no userInfo is returned and no error message is provided', async () => {
    render(
      <ConnectToDiscordSuccess
        username="fakeUser"
        errorCode={ErrorCode.DISCORD_ERROR}
        error={{ message: '' }}
      />
    )
    await waitFor(() => {
      expect(
        screen.getByText(
          'Dear fakeUser, we had trouble connecting to Discord, please try again.',
          {
            exact: true
          }
        )
      ).toBeTruthy()
      expect(screen.queryByText('Error log')).toBeNull()
    })
  })
})
