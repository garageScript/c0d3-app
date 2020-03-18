import { loginUser } from '../helpers/loginUser'

describe('loginUser function', () => {
  test('should call fetch with the correct data', async () => {
    window.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        redirected: true
      })
    )
    await loginUser('hello', 'hpass')
    expect(fetch).toBeCalledWith('undefined/signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: 'hello',
        password: 'hpass'
      })
    })
  })

  test('should return null', async () => {
    window.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        redirected: true
      })
    )
    const result = await loginUser('hello', 'hpass')
    expect(result).toEqual(null)
  })

  test('should return null', async () => {
    window.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        redirected: false,
        json: () => {
          return 'sampleResult'
        }
      })
    )
    const result = await loginUser('hello', 'hpass')
    expect(result).toEqual('sampleResult')
  })
})
