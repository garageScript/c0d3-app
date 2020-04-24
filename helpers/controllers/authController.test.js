jest.mock('bcrypt')
jest.mock('../dbload')
import bcrypt from 'bcrypt'
import db from '../dbload'
import { login, logout } from './authController'

describe('auth controller', () => {
  let userArgs
  beforeEach(() => {
    jest.clearAllMocks()
    userArgs = { username: 'testuser', password: 'c0d3reallyhard' }
  })

  test('Login - should throw error when session is null', async () => {
    expect(
      login({}, userArgs, { req: { session: null } })
    ).rejects.toThrowError('')
  })

  test('Login - should return success false if user cannot be found', async () => {
    db.User.findOne = jest.fn().mockReturnValue(null)
    const result = await login({}, userArgs, { req: { session: {} } })
    expect(result).toEqual({
      success: false,
      error: 'user does not exist'
    })
  })

  test('Login - should return success false if password is invalid', async () => {
    db.User.findOne = jest.fn().mockReturnValue({})
    bcrypt.compare = jest.fn().mockReturnValue(false)
    const result = await login({}, userArgs, { req: { session: {} } })
    expect(result).toEqual({
      success: false,
      error: 'Password is invalid'
    })
  })

  test('Login - should return success true if successful login', async () => {
    db.User.findOne = jest.fn().mockReturnValue({ username: 'testuser' })
    bcrypt.compare = jest.fn().mockReturnValue(true)
    const result = await login({}, userArgs, { req: { session: {} } })
    expect(result).toEqual({
      success: true,
      username: 'testuser'
    })
  })

  test('Logout - should reject with error', async () => {
    const session = null
    logout({}, {}, { req: { session } }).catch(e => {
      expect(e).toEqual({
        success: false,
        error: 'Session Error'
      })
    })
  })

  test('Logout - should reject with error if destroy encounters error', async () => {
    const session = {
      destroy: inputCb => {
        inputCb({ message: 'OWNED BY TEST' })
      }
    }
    logout({}, {}, { req: { session } }).catch(e => {
      expect(e).toEqual({
        success: false,
        error: 'OWNED BY TEST'
      })
    })
  })

  test('Logout - should resolve with success true if destroy has no error', async () => {
    const session = {
      destroy: inputCb => {
        inputCb(false)
      }
    }
    const result = await logout({}, {}, { req: { session } })
    expect(result).toEqual({
      success: true
    })
  })
})
