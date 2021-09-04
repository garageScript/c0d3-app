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

type DiscordUserInfo = {
  userId: string
  username: string
  avatarUrl: string
  refreshToken: string
}

export const getTokenFromAuthCode = (
  code: string
): Promise<AccessTokenResponse> => {
  return fetch(`${discordAPI}/oauth2/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id,
      client_secret,
      code,
      redirect_uri,
      scope: 'email guilds.join gdm.join identify'
    })
  }).then(r => r.json())
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

const getUserInfo = (accessToken: string): Promise<UserInfoResponse> => {
  return fetch(`${discordAPI}/users/@me`, {
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`
    }
  }).then(r => r.json())
}

const updateUserRefreshToken = (
  userId: number,
  refreshToken: string
): Promise<User> => {
  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      discordRefreshToken: refreshToken
    }
  })
}

export const getUserInfoFromRefreshToken = async (
  userId: number,
  refreshToken: string
): Promise<DiscordUserInfo> => {
  const tokenResponse = await getTokenFromRefreshToken(refreshToken)
  const updatedRefreshToken = tokenResponse.refresh_token || ''
  // if updatedRefreshToken is undefined, empty string is stored in db to remove invalid refresh tokens
  await updateUserRefreshToken(userId, updatedRefreshToken)
  console.table({
    label: 'call to getUserInfoFromRefreshToken',
    starting_refresh_token: refreshToken,
    token_response: tokenResponse.refresh_token,
    token_stored_in_db: updatedRefreshToken
  })

  if (!updatedRefreshToken)
    throw new Error(`refresh token invalid for userId ${userId}`)

  const { id, username, avatar } = await getUserInfo(tokenResponse.access_token)

  return {
    userId: id,
    username,
    avatarUrl: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
    refreshToken: updatedRefreshToken
  }
}
