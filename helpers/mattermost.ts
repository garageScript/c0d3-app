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
      return {
        success: false,
        error: 'Invalid or missing parameter in mattermost request'
      }
    }
    if (response.status === 403) {
      return {
        success: false,
        error: 'Invalid permission'
      }
    }
    return {
      success: false,
      error: 'Unknown error (Default Case)'
    }
  } catch (e) {
    return {
      success: false,
      error: 'Internal Server Error'
    }
  }
}
