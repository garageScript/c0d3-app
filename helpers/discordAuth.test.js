jest.mock('node-fetch')
jest.mock('prisma')
import fetch from 'node-fetch'
import prisma from '../prisma'
import { URLSearchParams } from 'url'

import {
  client_id,
  client_secret,
  redirect_uri,
  getTokenFromAuthCode,
  getUserInfoFromRefreshToken
} from './discordAuth'

describe('getTokenFromAuthCode function', () => {
  test('fetch should be called once', async () => {
    fetch.mockResolvedValue({ json: () => {} })
    const mockRefreshToken = await getTokenFromAuthCode('123')

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
        code: '123',
        redirect_uri,
        scope: 'email guilds.join gdm.join identify'
      })
    })
  })
})

describe('getUserInfoFromRefreshToken function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prisma.user.update = jest.fn()
  })
  it('should call the correct functions and update refresh token in database and return the correct object if refresh token valid', async () => {
    fetch.mockResolvedValueOnce({
      json: () => ({
        refresh_token: 'fakeRefreshToken',
        access_token: 'fakeAccessToken'
      })
    })
    fetch.mockResolvedValueOnce({
      json: () => ({
        id: 'discord123',
        username: 'discord-fakeuser',
        avatar: 'ea8f5f59aff14450e892321ba128745d'
      })
    })
    const result = await getUserInfoFromRefreshToken(123, 'mockRefreshToken')

    expect(fetch.mock.calls.length).toBe(2)

    // first fetch function call
    expect(fetch.mock.calls[0][0]).toBe(
      'https://discordapp.com/api/oauth2/token'
    )
    expect(fetch.mock.calls[0][1]).toEqual({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: new URLSearchParams({
        client_id,
        client_secret,
        grant_type: 'refresh_token',
        refresh_token: 'mockRefreshToken'
      })
    })

    // second fetch function call
    expect(fetch.mock.calls[1][0]).toBe('https://discordapp.com/api/users/@me')
    expect(fetch.mock.calls[1][1]).toEqual({
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: 'Bearer fakeAccessToken'
      }
    })

    // database call
    expect(prisma.user.update.mock.calls.length).toBe(1)
    expect(prisma.user.update.mock.calls[0][0]).toEqual({
      where: {
        id: 123
      },
      data: {
        discordRefreshToken: 'fakeRefreshToken'
      }
    })

    expect(result).toEqual({
      userId: 'discord123',
      username: 'discord-fakeuser',
      avatarUrl:
        'https://cdn.discordapp.com/avatars/discord123/ea8f5f59aff14450e892321ba128745d.png',
      refreshToken: 'fakeRefreshToken'
    })
  })

  it('should throw error and update database with empty string if refresh token invalid', async () => {
    fetch.mockResolvedValueOnce({
      json: () => ({})
    })
    try {
      const result = await getUserInfoFromRefreshToken(
        123,
        'invalidRefreshToken'
      )
      expect(false).toEqual(true) // force test to fail
    } catch (error) {
      expect(error.message).toBe('refresh token invalid for userId 123')
    }

    expect(fetch.mock.calls.length).toBe(1)
    expect(prisma.user.update.mock.calls.length).toBe(1)
    expect(prisma.user.update.mock.calls[0][0]).toEqual({
      where: {
        id: 123
      },
      data: {
        discordRefreshToken: ''
      }
    })
  })
})
