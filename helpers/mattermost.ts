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

export const changeChatPassword = async (email: string, password: string) => {
  const response = await fetch(`${chatServiceUrl}/users/email/${email}`, {
    headers
  })
  if (response.status !== 200) {
    throw new Error('Invalid Email')
  }

  const rJson = await response.json()

  const { id } = rJson

  await fetch(`${chatServiceUrl}/users/${id}/password`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      new_password: password
    })
  })

  return true
}
