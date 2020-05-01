import fetch from 'node-fetch'
const accessToken = process.env.MATTERMOST_ACCESS_TOKEN
const chatServiceUrl = process.env.CHAT_URL

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
    if (response.status === 401) {
      throw new Error('Invalid or missing parameter in mattermost request')
    }
    if (response.status === 403) {
      throw new Error('Invalid permission')
    }

    throw new Error('Unexpected Response') // Mattermost will only respond with 201, 401 and 403
  } catch (err) {
    throw new Error(err || 'Internal Server Error')
  }
}

const getChannelInfo = async (roomName: string) => {
  const devOrProd = process.env.NODE_ENV === 'production' ? 'c0d3' : 'c0d3-dev'
  const response = await fetch(
    `${chatServiceUrl}/teams/name/${devOrProd}/channels/name/${roomName}`,
    { headers }
  )
  return response.json()
}

const sendMessage = async (channelId: string, message: string) =>
  fetch(`${chatServiceUrl}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      channel_id: channelId,
      message
    })
  }).catch(error => {
    throw new Error(error)
  })

export const publicChannelMessage = async (
  channelName: string,
  message: string
) => {
  const channelId = await getChannelInfo(channelName)
  sendMessage(channelId.id, message)
}
