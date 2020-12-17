import fetch from 'node-fetch'
import _ from 'lodash'
import {
  UserInfo,
  ChannelInfo,
  GetChannelInfo,
  SendMessage,
  PublicChannelMessage,
  SendDirectMessage,
  DirectChannelInfo
} from '../@types/mattermost'

const accessToken = process.env.MATTERMOST_ACCESS_TOKEN || '123' // For Testing
const chatServiceUrl =
  process.env.CHAT_URL || 'https://mattermost.devwong.com/api/v4' // For Testing

const headers = {
  Authorization: `Bearer ${accessToken}`
}

export const chatSignUp = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const response = await fetch(`${chatServiceUrl}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    if (response.status === 201) {
      return { success: true }
    }
    if (response.status === 400) {
      throw new Error('Invalid or missing parameter in mattermost request')
    }
    if (response.status === 403) {
      throw new Error('Invalid permission')
    }

    throw new Error('Unexpected Response') // Mattermost will only respond with 201, 400 and 403
  } catch (err) {
    throw new Error(err || 'Internal Server Error')
  }
}

export const changeChatPassword = async (email: string, password: string) => {
  // Using email in case they change their mattermost username
  const response = await fetch(`${chatServiceUrl}/users/email/${email}`, {
    headers
  })
  if (response.status !== 200) {
    throw new Error('Invalid Email')
  }

  const rJson = await response.json()

  const { id } = rJson

  const setPwResponse = await fetch(`${chatServiceUrl}/users/${id}/password`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      new_password: password
    })
  })

  if (setPwResponse.status !== 200) {
    throw new Error('Changing Chat Password Failed')
  }

  return true
}

export const getChannelInfo: GetChannelInfo = async roomName => {
  try {
    const chatServiceUrl = process.env.CHAT_URL
    const url = `${chatServiceUrl}/teams/name/c0d3/channels/name/${roomName}`

    const response: ChannelInfo = await fetch(url, { headers })
    if (response.status !== 200) throw new Error(response.statusText)

    return await response.json()
  } catch (error) {
    throw new Error(error)
  }
}

export const sendMessage: SendMessage = async (channelId, message) => {
  return fetch(`${chatServiceUrl}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      channel_id: channelId,
      message
    })
  })
}

export const sendDirectMessage: SendDirectMessage = async (userId, message) => {
  // the mattermost api endpoint '/users/me' returns the info
  // about the authenticated user, which in this case is the bot
  const { id: botId } = await getChatUserById('me')
  const { id: channelId } = await findOrCreateDirectMessageChannel(
    botId,
    userId
  )
  return sendMessage(channelId, message)
}

export const publicChannelMessage: PublicChannelMessage = async (
  channelName,
  message
) => {
  try {
    const { id } = await getChannelInfo(channelName)
    sendMessage(id, message)
  } catch (error) {
    throw new Error(error)
  }
}

export const getUserByEmail = async (email: string): Promise<UserInfo> => {
  try {
    const user = await fetch(`${chatServiceUrl}/users/email/${email}`, {
      headers
    })
    return await user.json()
  } catch (error) {
    throw new Error(error)
  }
}

export const getChatUserById = _.memoize(
  async (id: string): Promise<UserInfo> => {
    try {
      const response = await fetch(`${chatServiceUrl}/users/${id}`, { headers })
      return await response.json()
    } catch (error) {
      throw new Error(error)
    }
  }
)

export const findOrCreateDirectMessageChannel: DirectChannelInfo = _.memoize(
  async (senderId, receiverId) => {
    try {
      const response = await fetch(`${chatServiceUrl}/channels/direct`, {
        method: 'POST',
        headers,
        body: JSON.stringify([senderId, receiverId])
      })
      return await response.json()
    } catch (error) {
      throw new Error(error)
    }
  }
)
