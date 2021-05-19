jest.mock('bcrypt')
jest.mock('mailgun-js')
jest.mock('../mattermost')
jest.mock('../mail')
import bcrypt from 'bcrypt'
import { login, logout, signup, isTokenValid } from './authController'
import { chatSignUp } from '../mattermost'
import { prisma } from '../../prisma'

describe('auth controller', () => {
  let userArgs
  beforeEach(() => {
    jest.clearAllMocks()
    userArgs = {
      username: 'testuser',
      password: 'c0d3reallyhard',
      firstName: 'testuser1',
      lastName: 'testuser1',
      email: 'testuser@c0d3.com',
      cliToken:
        'eyJpZCI6MTIxMCwiY2xpVG9rZW4iOiIxdHhrYndxMHYxa0hoenlHWmFmNTMifQ=='
    }
  })

  describe('Login', () => {
    test('should throw error when session is null', () => {
      return expect(
        login({}, userArgs, { req: { session: null } })
      ).rejects.toThrowError('')
    })

    test('should throw error if user cannot be found', () => {
      prisma.user.findFirst = jest.fn().mockReturnValue(null)
      return expect(
        login({}, userArgs, { req: { session: {} } })
      ).rejects.toThrowError('User does not exist')
    })

    test('should throw error if password is invalid', () => {
      prisma.user.findFirst = jest.fn().mockReturnValue({})
      bcrypt.compare = jest.fn().mockReturnValue(false)
      return expect(
        login({}, userArgs, { req: { session: {} } })
      ).rejects.toThrowError('Password is invalid')
    })

    test('should return success true if successful login', () => {
      prisma.user.findFirst = jest.fn().mockReturnValue({
        username: 'testuser',
        password: 'fakepassword',
        cliToken: 'fakeCliToken'
      })
      bcrypt.compare = jest.fn().mockReturnValue(true)
      const result = login({}, userArgs, { req: { session: {} } })
      expect(result).resolves.toEqual({
        success: true,
        username: 'testuser',
        cliToken: 'eyJjbGlUb2tlbiI6ImZha2VDbGlUb2tlbiJ9'
      })
    })

    test('should return user with a new CLI token', () => {
      prisma.user.findFirst = jest
        .fn()
        .mockReturnValue({ username: 'fakeUser', password: 'fakePassword' })
      prisma.user.update = obj => jest.fn().mockReturnThis(obj)
      bcrypt.compare = jest.fn().mockReturnValue(true)
      const result = login({}, userArgs, { req: { session: {} } })
      expect(result).resolves.toHaveProperty('cliToken')
    })
  })

  describe('Logout', () => {
    test('should reject with error', () => {
      const result = logout({}, {}, { req: { session: null } })
      expect(result).rejects.toEqual({
        success: false,
        error: 'Session Error'
      })
    })

    test('should reject with error if destroy encounters error', () => {
      const session = {
        destroy: inputCb => {
          inputCb({ message: 'OWNED BY TEST' })
        }
      }

      const result = logout({}, {}, { req: { error: jest.fn(), session } })
      expect(result).rejects.toEqual({
        success: false,
        error: 'OWNED BY TEST'
      })
    })

    test('should resolve with success true if destroy has no error', () => {
      const session = {
        destroy: inputCb => {
          inputCb(false)
        }
      }
      const result = logout(
        {},
        {},
        { req: { session }, res: { setHeader: () => {} } }
      )
      expect(result).resolves.toEqual({
        success: true
      })
    })
  })

  describe('Signup', () => {
    test('should reject if user information is incomplete', () => {
      return expect(
        signup({}, {}, { req: { session: {} } })
      ).rejects.toThrowError('Register form is not completely filled out')
    })

    test('should reject if user already exists', () => {
      prisma.user.findFirst = jest
        .fn()
        .mockReturnValue({ username: 'c0d3user' })
      return expect(
        signup({}, userArgs, { req: { session: {} } })
      ).rejects.toThrowError('User already exists')
    })

    test('should reject on second findOne. The first request checks for username, second request checks for email', () => {
      prisma.user.findFirst = jest
        .fn()
        .mockReturnValueOnce(null)
        .mockReturnValue({ username: 'c0d3user' }) // Second call for User.findOne checks for email
      return expect(
        signup({}, userArgs, { req: { session: {} } })
      ).rejects.toThrowError('Email already exists')
    })

    test('should not create user if chat signup responds with 401 or 403', async () => {
      prisma.user.findFirst = jest.fn().mockReturnValue(null)
      prisma.user.create = jest.fn()

      chatSignUp.mockRejectedValue(
        'Invalid or missing parameter in mattermost request'
      )

      await expect(
        signup({}, userArgs, { req: { error: jest.fn(), session: {} } })
      ).rejects.toThrowError(
        'Invalid or missing parameter in mattermost request'
      )

      expect(prisma.user.create).not.toBeCalled()
    })

    test('should not create user if chat signup throws an error', () => {
      prisma.user.findFirst = jest.fn().mockReturnValue(null)
      prisma.user.create = jest.fn()

      chatSignUp.mockRejectedValueOnce('Mattermost Error')

      expect(
        signup({}, userArgs, { req: { error: jest.fn(), session: {} } })
      ).rejects.toThrow('Mattermost Error')

      expect(prisma.user.create).not.toBeCalled()
    })

    test('should resolve with success true if signup successful ', async () => {
      prisma.user.findFirst = jest.fn().mockReturnValue(null)
      prisma.user.create = jest.fn().mockReturnValue({
        username: 'user',
        id: 1234
      })
      prisma.user.update = jest.fn().mockReturnValue({ username: 'user' })
      chatSignUp.mockResolvedValueOnce({
        success: true
      })
      const result = await signup({}, userArgs, {
        req: { error: jest.fn(), session: {} }
      })
      expect(result).toEqual({
        username: 'user',
        success: true,
        forgotToken: result.forgotToken
      })
      expect(prisma.user.update).toBeCalled()
    })

    test('should throw error when session is null', () => {
      return expect(
        signup({}, userArgs, { req: { session: null } })
      ).rejects.toThrowError('')
    })
  })

  describe('isTokenValid', () => {
    test('should return true', () => {
      prisma.user.findUnique = jest
        .fn()
        .mockResolvedValue({ cliToken: '1txkbwq0v1kHhzyGZaf53' })
      expect(isTokenValid(null, userArgs)).resolves.toBe(true)
    })

    test('should return false', () => {
      prisma.user.findUnique = jest.fn().mockResolvedValue(null)
      expect(isTokenValid(null, userArgs)).resolves.toBe(false)
    })

    test('should throw error', () => {
      prisma.user.findUnique = jest.fn().mockRejectedValue()
      expect(isTokenValid(null, userArgs)).rejects.toThrowError()
    })
  })
})
