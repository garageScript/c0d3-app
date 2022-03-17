import prisma from '../prisma'
import { URLSearchParams } from 'url'
import { User } from '.prisma/client'
import fetch from 'node-fetch'

const discordAPI = 'https://discordapp.com/api'
export const client_id = process.env.DISCORD_KEY
export const client_secret = process.env.DISCORD_SECRET
export const redirect_uri = process.env.DISCORD_REDIRECT_URI // {baseurl}/api/auth/callback/discord

type AccessTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

type UserInfoResponse = {
  id: string
  username: string
  avatar: string
  discriminator: string
  public_flags: number
  locale: string
  mfa_enabled: boolean
  email: string
  verified: boolean
}

export type DiscordUserInfo = {
  userId: string
  username: string
  avatarUrl: string
  refreshToken: string
}

export const updateRefreshandAccessTokens = (
  userId: number,
  discordId: string,
  refreshToken: string,
  accessToken: string,
  accessTokenExpiresAt: Date
): Promise<User> => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      discordRefreshToken: refreshToken,
      discordAccessToken: accessToken,
      discordAccessTokenExpires: accessTokenExpiresAt,
      discordId
    }
  })
}

const getTokenFromRefreshToken = (
  refresh_token: string
): Promise<AccessTokenResponse> => {
  return fetch(`${discordAPI}/oauth2/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: new URLSearchParams({
      client_id,
      client_secret,
      grant_type: 'refresh_token',
      refresh_token
    })
  }).then(r => r.json())
}

const getUserInfoFromAccessToken = (
  accessToken: string
): Promise<UserInfoResponse> => {
  return fetch(`${discordAPI}/users/@me`, {
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`
    }
  }).then(r => r.json())
}

export const getDiscordUserInfo = async (
  user: User
): Promise<DiscordUserInfo> => {
  try {
    const {
      discordRefreshToken,
      discordAccessToken,
      discordAccessTokenExpires
    } = user

    let userId = '',
      username = '',
      avatarUrl = '',
      refreshToken = discordRefreshToken || '',
      accessToken = discordAccessToken || ''

    if (!discordRefreshToken)
      return {
        userId,
        username,
        avatarUrl,
        refreshToken
      }

    if (!discordAccessToken || Number(discordAccessTokenExpires) < Date.now()) {
      const tokenResponse = await getTokenFromRefreshToken(refreshToken)
      refreshToken = tokenResponse.refresh_token || ''
      accessToken = tokenResponse.access_token || ''
      const accessTokenExpiresAt = new Date(
        Date.now() + (tokenResponse.expires_in * 1000 || 0)
      )

      // if updatedRefreshToken is undefined, empty string is stored in db to remove invalid tokens
      await updateRefreshandAccessTokens(
        user.id,
        user.discordId!,
        refreshToken,
        accessToken,
        accessTokenExpiresAt
      )
    }

    if (!accessToken)
      throw new Error(`refresh token invalid for userId ${user.id}`)

    const userInfo = await getUserInfoFromAccessToken(accessToken)

    userId = userInfo.id
    username = `${userInfo.username}#${userInfo.discriminator}`
    avatarUrl = `https://cdn.discordapp.com/avatars/${userInfo.id}/${userInfo.avatar}.png`

    if (!userId) throw new Error(`access token invalid for userId ${user.id}`)

    return {
      userId,
      username,
      avatarUrl,
      refreshToken
    }
  } catch (error) {
    return {
      userId: '',
      username: '',
      avatarUrl: '',
      refreshToken: ''
    }
  }
}
