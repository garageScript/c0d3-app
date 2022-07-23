/**
 * @jest-environment node
 */

jest.mock('bcrypt')
jest.mock('nodemailer')
jest.mock('../../helpers/mail')
import bcrypt from 'bcrypt'
import prismaMock from '../../__tests__/utils/prismaMock'
import { sendSignupEmail } from '../../helpers/mail'
import { isTokenValid, login, logout, signup } from './authController'

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
      prismaMock.user.findFirst.mockResolvedValue(null)
      return expect(
        login({}, userArgs, { req: { session: {}, error: () => {} } })
      ).rejects.toThrowError('User does not exist')
    })

    test('should throw error if password is invalid', () => {
      prismaMock.user.findFirst.mockResolvedValue({})
      bcrypt.compare = jest.fn().mockReturnValue(false)
      return expect(
        login({}, userArgs, { req: { session: {}, error: () => {} } })
      ).rejects.toThrowError('Password is invalid')
    })

    test('should return success true if successful login', () => {
      prismaMock.user.findFirst.mockResolvedValue({
        username: 'testuser',
        password: 'fakepassword',
        cliToken: 'fakeCliToken',
        id: 1
      })
      bcrypt.compare = jest.fn().mockReturnValue(true)
      const result = login({}, userArgs, { req: { session: {} } })
      expect(result).resolves.toEqual({
        success: true,
        username: 'testuser',
        cliToken: expect.any(String),
        id: 1
      })
    })

    test('should return user with a new CLI token', () => {
      const user = {
        username: 'fakeUser',
        password: 'fakePassword'
      }
      prismaMock.user.findFirst.mockResolvedValue(user)
      prismaMock.user.update.mockResolvedValue({
        ...user,
        cliToken: 'clitoken'
      })
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
    const user = {
      id: 1234,
      username: 'test',
      name: 'Test Testington',
      email: 'test@fake.com'
    }

    test('should reject if user information is incomplete', () => {
      return expect(
        signup({}, {}, { req: { session: {} } })
      ).rejects.toThrowError('Register form is not completely filled out')
    })

    test('should reject if user already exists', () => {
      prismaMock.user.findFirst.mockResolvedValue({ username: 'c0d3user' })
      return expect(
        signup({}, userArgs, { req: { session: {} } })
      ).rejects.toThrowError('User already exists')
    })

    test('should reject if password is invalid', () => {
      prismaMock.user.findFirst.mockResolvedValue(null)
      return expect(
        signup({}, { ...userArgs, password: '12' }, { req: { session: {} } })
      ).rejects.toThrowError('Password does not meet criteria')
    })

    test('should reject on second findOne. The first request checks for username, second request checks for email', () => {
      prismaMock.user.findFirst
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ username: 'c0d3user' }) // Second call for User.findOne checks for email
      return expect(
        signup({}, userArgs, { req: { session: {} } })
      ).rejects.toThrowError('Email already exists')
    })

    test('should resolve with success true if signup successful ', async () => {
      prismaMock.user.findFirst.mockResolvedValue(null)
      prismaMock.user.create.mockResolvedValue(user)
      prismaMock.user.update.mockResolvedValue({
        ...user,
        forgotToken: 'forgotToken',
        tokenExpiration: new Date()
      })
      const result = await signup({}, userArgs, {
        req: { error: jest.fn(), session: {} }
      })
      expect(result).toEqual({
        username: user.username,
        success: true,
        cliToken: expect.any(String),
        id: user.id
      })
      expect(prismaMock.user.update).toBeCalled()
    })

    test('should throw error when session is null', () => {
      return expect(
        signup({}, userArgs, { req: { session: null } })
      ).rejects.toThrowError('')
    })

    it('should log error if email is not sent correctly', async () => {
      prismaMock.user.create.mockResolvedValue(user)
      prismaMock.user.update.mockResolvedValue(user)
      sendSignupEmail.mockRejectedValue(Error('email not sent'))
      const mock = jest.fn()
      await signup({}, userArgs, {
        req: { error: mock, session: {} }
      })
      expect(mock).toBeCalled()
    })
  })

  describe('isTokenValid', () => {
    test('should return true', () => {
      prismaMock.user.findUnique.mockResolvedValue({
        cliToken: '1txkbwq0v1kHhzyGZaf53'
      })
      return expect(isTokenValid(null, userArgs)).resolves.toBe(true)
    })

    test('should return false if user is null', () => {
      prismaMock.user.findUnique.mockResolvedValue(null)
      return expect(isTokenValid(null, userArgs)).resolves.toBe(false)
    })

    test('should return false if token is not equal', () => {
      prismaMock.user.findUnique.mockResolvedValue({ cliToken: '' })
      return expect(isTokenValid(null, userArgs)).resolves.toBe(false)
    })
    test('should throw error', () => {
      prismaMock.user.findUnique.mockRejectedValue(new Error('Some Error'))
      return expect(isTokenValid(null, userArgs)).rejects.toThrowError()
    })
  })
})
