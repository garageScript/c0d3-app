jest.mock('bcrypt')
jest.mock('../dbload')
jest.mock('../mattermost')
import bcrypt from 'bcrypt'
import db from '../dbload'
import { login, logout, signup } from './authController'
import { chatSignUp } from '../mattermost'

describe('auth controller', () => {
  let userArgs
  beforeEach(() => {
    jest.clearAllMocks()
    userArgs = {
      username: 'testuser',
      password: 'c0d3reallyhard',
      firstName: 'testuser1',
      lastName: 'testuser1',
      email: 'testuser@c0d3.com'
    }
  })

  test('Login - should throw error when session is null', async () => {
    return expect(
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

  test('Signup - should resolve with success false if userinfo is incomplete', async () => {
    const result = await signup({}, {}, { req: { session: {} } })
    expect(result).toEqual({
      success: false,
      error: 'Invalid registration information'
    })
  })

  test('Signup - should resolve with success false if user already exists', async () => {
    db.User.findOne = jest.fn().mockReturnValue({ username: 'c0d3user' })
    const result = await signup({}, userArgs, { req: { session: {} } })
    expect(result).toEqual({
      success: false,
      error: 'User already exists'
    })
  })

  test('Signup - should resolve with success false if email already exists', async () => {
    db.User.findOne = jest
      .fn()
      .mockReturnValueOnce(null)
      .mockReturnValue({ username: 'c0d3user' }) // Second call for User.findOne checks for email
    const result = await signup({}, userArgs, { req: { session: {} } })
    expect(result).toEqual({
      success: false,
      error: 'Email already exists'
    })
  })

  test('Signup - should not create user if chat signup response with 401 or 403', async () => {
    db.User.findOne = jest.fn().mockReturnValue(null)
    db.User.destroy = jest.fn()

    chatSignUp.mockResolvedValueOnce({
      success: false,
      error: 'Mattermost signup error'
    })
    chatSignUp.mockRejectedValueOnce({
      success: false,
      error: 'Mattermost signup error'
    })

    const resolvedResult = await signup({}, userArgs, { req: { session: {} } })
    expect(resolvedResult).toEqual({
      success: false,
      error: 'Mattermost signup error'
    })

    const rejectedResult = await signup({}, userArgs, { req: { session: {} } })
    expect(rejectedResult).toEqual({
      success: false,
      error: 'Mattermost signup error'
    })

    expect(db.User.destroy).toBeCalledTimes(2)
  })

  test('Signup - should resolve with success true if signup successful ', async () => {
    db.User.findOne = jest.fn().mockReturnValue(null)
    db.User.create = jest.fn().mockReturnValue({ username: 'user' })
    chatSignUp.mockResolvedValueOnce({
      success: true
    })
    const result = await signup({}, userArgs, { req: { session: {} } })
    expect(result).toEqual({
      success: true,
      username: 'user'
    })
  })
})
