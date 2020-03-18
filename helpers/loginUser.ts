const SERVER_URL = process.env.SERVER_URL

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${SERVER_URL}/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  if (!res.redirected) {
    return res.json()
  }
  return null
}
