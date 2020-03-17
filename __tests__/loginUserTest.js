import { loginUser } from '../helpers/loginUser'
describe('loginUser helper', () => {
  test('Should return object', async () => {
    window.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        redirected: false
      })
    )
    expect(Promise.resolve(loginUser('user123', 'pass123'))).resolves.toBe({})
  })
  test('Should return null', async () => {
    window.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        redirected: true
      })
    )
    expect(Promise.resolve(loginUser('user123', 'pass123'))).resolves.toBe(null)
  })
})
