import { Values } from '../@types/signup'

const SERVER_URL = process.env.SERVER_URL

export const signupUser = async (values: Values) => {
  try {
    const res = await fetch(`${SERVER_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: values.firstName + ' ' + values.lastName,
        userName: values.username, //TODO remove userName field when server API validation is fixed
        username: values.username,
        confirmEmail: values.email,
        password: values.password
      })
    })
    return res.json()
  } catch (e) {}
}
