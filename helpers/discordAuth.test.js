jest.mock('node-fetch')
jest.mock('prisma')
import fetch from 'node-fetch'
import prisma from '../prisma'
import { URLSearchParams } from 'url'

import {
  client_id,
  client_secret,
  redirect_uri,
  setTokenFromAuthCode,
  getDiscordUserInfo
} from './discordAuth'
import { executionAsyncId } from 'async_hooks'

const emptyUserInfoResult = {
  userId: '',
  username: '',
  avatarUrl: '',
  refreshToken: ''
}

describe('setTokenFromAuthCode function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prisma.user.update = jest.fn()
  })

  global.Date.now = jest.fn(() => 200)

  it('should call fetch once and update user in database', async () => {
    fetch.mockResolvedValue({
      json: () => ({
        access_token: '',
        refresh_token: '',
        expires_in: 0
      })
    })
    await setTokenFromAuthCode(123, 'fakeAuthCode')

    expect(fetch.mock.calls[0][0]).toBe(
      'https://discordapp.com/api/oauth2/token'
    )
    expect(fetch.mock.calls[0][1]).toEqual({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id,
        client_secret,
        code: 'fakeAuthCode',
        redirect_uri,
        scope: 'email guilds.join gdm.join identify'
      })
    })
    expect(prisma.user.update.mock.calls[0][0]).toEqual({
      where: {
        id: 123
      },
      data: {
        discordRefreshToken: '',
        discordAccessToken: '',
        discordAccessTokenExpires: new Date(200)
      }
    })
  })
})

describe('getDiscordUserInfo function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prisma.user.update = jest.fn()
  })

  global.Date.now = jest.fn(() => 200)

  it('should return object with falsy values if user has no refresh token', async () => {
    const mockUser = {
      discordAccessToken: '',
      discordAccessTokenExpires: '',
      discordRefreshToken: ''
    }
    const result = await getDiscordUserInfo(mockUser)
    expect(result).toEqual(emptyUserInfoResult)
  })

  it('should fetch new tokens if user has no access token, then update user in database', async () => {
    const mockUser = {
      id: 123,
      discordAccessToken: '',
      discordAccessTokenExpires: 'tokenExpiration',
      discordRefreshToken: 'refreshToken'
    }
    fetch.mockResolvedValue({
      json: () => ({
        refresh_token: 'updatedRefreshToken',
        access_token: 'updatedAccessToken',
        expires_in: 10
      })
    })
    await getDiscordUserInfo(mockUser)
    expect(prisma.user.update.mock.calls[0][0]).toEqual({
      where: {
        id: 123
      },
      data: {
        discordRefreshToken: 'updatedRefreshToken',
        discordAccessToken: 'updatedAccessToken',
        discordAccessTokenExpires: new Date(200 + 10 * 1000)
      }
    })
  })

  it('should fetch new tokens if access token is expired, then update user in database', async () => {
    const mockUser = {
      id: 123,
      discordAccessToken: 'expiredAccessToken',
      discordAccessTokenExpires: new Date(0),
      discordRefreshToken: 'refreshToken'
    }
    fetch.mockResolvedValue({
      json: () => ({
        refresh_token: 'updatedRefreshToken',
        access_token: 'updatedAccessToken',
        expires_in: 10
      })
    })
    await getDiscordUserInfo(mockUser)
    expect(prisma.user.update.mock.calls[0][0]).toEqual({
      where: {
        id: 123
      },
      data: {
        discordRefreshToken: 'updatedRefreshToken',
        discordAccessToken: 'updatedAccessToken',
        discordAccessTokenExpires: new Date(200 + 10 * 1000)
      }
    })
  })

  it('should return empty values if refresh token is invalid and update user in database', async () => {
    const mockUser = {
      id: 123,
      discordAccessToken: 'invalidAccessToken',
      discordAccessTokenExpires: 0,
      discordRefreshToken: 'invalidRefreshToken'
    }
    fetch.mockResolvedValue({
      json: () => ({
        refresh_token: '',
        access_token: '',
        expires_in: 0
      })
    })
    const result = await getDiscordUserInfo(mockUser)
    expect(fetch.mock.calls.length).toBe(1)
    expect(prisma.user.update.mock.calls[0][0]).toEqual({
      where: {
        id: 123
      },
      data: {
        discordRefreshToken: '',
        discordAccessToken: '',
        discordAccessTokenExpires: new Date(200)
      }
    })
    expect(result).toEqual(emptyUserInfoResult)
  })

  it('should call the correct functions and update refresh token in database and return the correct object if access token is valid', async () => {
    const mockUser = {
      id: 123,
      discordAccessToken: 'validFreshAccessToken',
      discordAccessTokenExpires: Date.now(),
      discordRefreshToken: 'validRefreshToken'
    }
    fetch.mockResolvedValue({
      json: () => ({
        id: 'discord123',
        username: 'discord-fakeuser',
        avatar: 'ea8f5f59aff14450e892321ba128745d'
      })
    })
    const result = await getDiscordUserInfo(mockUser)

    expect(fetch.mock.calls.length).toBe(1)

    expect(fetch.mock.calls[0][0]).toBe('https://discordapp.com/api/users/@me')
    expect(fetch.mock.calls[0][1]).toEqual({
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer validFreshAccessToken'
      }
    })

    expect(result).toEqual({
      userId: 'discord123',
      username: 'discord-fakeuser',
      avatarUrl:
        'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
      refreshToken: 'validRefreshToken'
    })
  })
})
