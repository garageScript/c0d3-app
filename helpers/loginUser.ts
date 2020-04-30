const SERVER_URL = process.env.SERVER_URL

export const loginUser = async (username: string, password: string) => {
  const res = await fetch(`${SERVER_URL}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation {
        login(username: "${username}", password: "${password}") {
          success
          username
          error
        }
      }`
    })
  })
  if (!res.redirected) {
    return res.json()
  }
  return null
}
