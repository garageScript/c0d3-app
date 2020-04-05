import { Values } from '../@types/signup'

const SERVER_URL = process.env.SERVER_URL

export const signupUser = async (values: Values) => {
  const res = await fetch(`${SERVER_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: values.firstName + ' ' + values.lastName,
      userName: values.username,
      username: values.username,
      confirmEmail: values.email,
      password: values.password
    })
  })
  if (!res.redirected) {
    return res.json()
  }
  return null
}
