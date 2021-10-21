jest.mock('../../../helpers/discordAuth')
jest.mock('../../../helpers/middleware/user')
jest.mock('../../../helpers/middleware/session')
jest.mock('../../../helpers/middleware/logger')

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import loggingMiddleware from '../../../helpers/middleware/logger'
import sessionMiddleware from '../../../helpers/middleware/session'
import userMiddleware from '../../../helpers/middleware/user'

import {
  getDiscordUserInfo,
  setTokenFromAuthCode
} from '../../../helpers/discordAuth'

import {
  USER_NOT_LOGGED_IN,
  DISCORD_ERROR,
  ConnectToDiscordSuccess,
  getServerSideProps
} from '../../../pages/discord/success'

const defaultMiddleware = (_req, _res, next) => next()

loggingMiddleware.mockImplementation(defaultMiddleware)
sessionMiddleware.mockReturnValue(defaultMiddleware)

const mockDiscordUserInfo = {
  userId: 'discord123',
  username: 'discord-fakeuser',
  avatarUrl:
    'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
  refreshToken: 'fakeRefreshToken'
}

const userNotLoggedInErrorProps = {
  props: {
    errorCode: USER_NOT_LOGGED_IN
  }
}

const discordErrorProps = {
  props: {
    error: '',
    errorCode: DISCORD_ERROR,
    username: 'fakeUser'
  }
}

const successfulAuthFlowProps = {
  props: {
    userInfo: mockDiscordUserInfo,
    username: 'fakeUser'
  }
}

describe('getServerSideProps function', () => {
  it('should return error if user not logged in', async () => {
    userMiddleware.mockImplementation(defaultMiddleware)
    const response = await getServerSideProps({
      req: {},
      query: { code: 'fakeAuthCode' }
    })
    expect(response).toEqual(userNotLoggedInErrorProps)
  })

  it('should return error if userInfo could not be retrieved from Discord', async () => {
    userMiddleware.mockImplementation((req, _res, next) => {
      req.user = {
        id: 123,
        username: 'fakeUser'
      }
      next()
    })
    setTokenFromAuthCode.mockResolvedValue({
      id: 123
    })
    getDiscordUserInfo.mockResolvedValue({})
    const response = await getServerSideProps({
      req: {},
      query: { code: 'fakeAuthCode' }
    })
    expect(response).toEqual(discordErrorProps)
  })

  it('should return error if auth code is empty or invalid', async () => {
    userMiddleware.mockImplementation((req, _res, next) => {
      req.user = {
        id: 123,
        username: 'fakeUser'
      }
      next()
    })
    const response = await getServerSideProps({
      req: {},
      query: { code: '' }
    })
    expect(response).toEqual(discordErrorProps)
  })

  it('should return username and userInfo if auth code is valid and userInfo is successfully retrieved', async () => {
    userMiddleware.mockImplementation((req, _res, next) => {
      req.user = {
        id: 123,
        username: 'fakeUser'
      }
      next()
    })
    setTokenFromAuthCode.mockResolvedValue({
      id: 123
    })
    getDiscordUserInfo.mockResolvedValue(mockDiscordUserInfo)
    const response = await getServerSideProps({
      req: {},
      query: { code: 'fakeAuthCode' }
    })
    expect(setTokenFromAuthCode).toBeCalledWith(123, 'fakeAuthCode')
    expect(response).toEqual(successfulAuthFlowProps)
  })
})

describe('connect to Discord success page', () => {
  it('should render success page if auth flow succeeded', async () => {
    const { container } = render(
      <ConnectToDiscordSuccess props={successfulAuthFlowProps} />
    )
    // expect(container).toMatchSnapshot()
    await waitFor(() =>
      expect(screen.getByTitle('title', { name: /Success/i })).toBeTruthy()
    )
  })

  it('should render user not logged in page if user not logged in', async () => {
    const { container } = render(
      <ConnectToDiscordSuccess props={userNotLoggedInErrorProps} />
    )
    // expect(container).toMatchSnapshot()
    await waitFor(() =>
      expect(screen.getByRole('title', { name: /Error/i })).toBeTruthy()
    )
  })

  it('should render discord error page if auth code is invalid or no userInfo is returned', async () => {
    const { container } = render(
      <ConnectToDiscordSuccess props={discordErrorProps} />
    )
    // expect(container).toMatchSnapshot()
    await waitFor(() =>
      expect(screen.getByRole('title', { name: /Error/i })).toBeTruthy()
    )
  })
})
