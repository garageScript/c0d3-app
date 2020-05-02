import { Values } from '../@types/signup'

const SERVER_URL = process.env.SERVER_URL

export const signupUser = async (values: Values) => {
//TODO remove userName field when server API validation is fixed
  try {
    const res = await fetch(`${SERVER_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: `mutation {
          signup(
            firstName: "${values.firstName}", 
            lastName: "${values.lastName}, 
            email: "${values.email}", 
            username: "${values.username}", 
            password: "${values.password}"
            ) {
              success
              username
              error
            }
          }`
      })
    })
    return res.json()
  } catch (e) {}
}

