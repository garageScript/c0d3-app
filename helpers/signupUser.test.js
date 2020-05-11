import { signupUser } from '../helpers/signupUser'

describe('Signup User Helper function', () => {
  const userFormFields = {
    email: 'emailman@emailman.com',
    firstName: 'Mitch',
    lastName: 'Dinh',
    userName: 'rogerrabbit',
    username: 'rogerrabbit',
    password: 'hello1234'
  }

  const invalidFormFields = {
    email: 'emailman@emailman.com'
  }

  test('should submit a fetch with the signup form data', async () => {
    window.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        redirected: false,
        json: () => {
          return {
            success: true
          }
        }
      })
    )
    await signupUser(userFormFields)
    expect(fetch).toBeCalledWith('undefined/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Mitch Dinh',
        userName: 'rogerrabbit',
        username: 'rogerrabbit',
        confirmEmail: 'emailman@emailman.com',
        password: 'hello1234'
      })
    })
  })
  test('should throw error when receives response from server for invalid signup information', async () => {
    const error = new Error()
    window.fetch = jest.fn().mockImplementation(() => {
      throw error
    })
    try {
      await signupUser(invalidFormFields)
    } catch (e) {
      expect(e).toEqual(error)
    }
  })
})
