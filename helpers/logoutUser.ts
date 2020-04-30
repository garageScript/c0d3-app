const SERVER_URL = process.env.SERVER_URL

const logoutUser = async () => {
  const res = await fetch(`${SERVER_URL}/signout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    }
  })

  if (res.status === 200) {
    return true
  }
  return false
}

export default logoutUser
