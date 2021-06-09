const qs = require('qs')
const client_id = process.env.DISCORD_KEY
const client_secret = process.env.DISCORD_SECRET

type DiscordUserInfoResponse = {
  discordUsername: string
  discordAvatarUrl: string
  discordRefreshToken: string
}

export const getTokenFromAuthCode = (code: string) => {
  return fetch(`https://discordapp.com/api/oauth2/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: qs.stringify({
      grant_type: 'authorization_code',
      client_id,
      client_secret,
      code,
      redirect_uri: 'https://c0d3.com/discord/redir'
    })
  }).then(r => r.json())
}

export const getTokenFromRefreshToken = (refresh_token: string) => {
  return fetch(`https://discordapp.com/api/oauth2/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    body: qs.stringify({
      client_id,
      client_secret,
      grant_type: 'refresh_token',
      refresh_token
    })
  }).then(r => r.json())
}

export const getUserInfo = (accessToken: string) => {
  return fetch(`https://discordapp.com/api/users/@me`, {
    method: 'GET',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`
    }
  }).then(r => r.json())
}

export const getUserInfoFromRefreshToken = async (
  refreshToken: string
): Promise<DiscordUserInfoResponse> => {
  const tokenResponse = await getTokenFromRefreshToken(refreshToken)
  if (!tokenResponse.refresh_token) throw new Error('refresh token invalid')

  const { username, avatar } = await getUserInfo(tokenResponse.access_token)
  return {
    discordUsername: username,
    discordAvatarUrl: avatar,
    discordRefreshToken: tokenResponse.refresh_token
  }
}

// in login check for refreshToken and start the auth flow process
// import getUserInfoFromRefreshToken into getUserInfo and createSubmission resolvers
