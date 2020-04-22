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
    await fetch(`${chatServiceUrl}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
  } catch (err) {
    console.error(err)
  }
}
