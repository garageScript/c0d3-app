import { signupUser } from '../helpers/signupUser'

describe('Signup User Helper function', () => {
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
    await signupUser({
      email: 'emailman@emailman.com',
      firstName: 'Mitch',
      lastName: 'Dinh',
      userName: 'rogerrabbit',
      username: 'rogerrabbit',
      password: 'hello1234'
    })
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
  test('should return server response when receives response from server for invalid signup information', async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      throw new Error()
    })
  })
})
