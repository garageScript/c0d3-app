jest.mock('bcrypt')
jest.mock('nanoid')
jest.mock('../mail')
import { nanoid } from 'nanoid'
import { changePw, reqPwReset } from './passwordController'
import { encode } from '../encoding'
import { prisma } from '../../prisma'

prisma.user.update = jest.fn(i => i.data)

describe('Request Password Reset', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const ctx = { req: { error: jest.fn() } }

  test('It should find a user with username if it is provided', async () => {
    nanoid.mockReturnValue('fake123')
    prisma.user.findFirst = jest.fn().mockResolvedValueOnce({
      id: 3
    })
    await expect(
      reqPwReset(() => {}, { userOrEmail: 'c0d3r' }, ctx)
    ).resolves.toEqual({
      success: true
    })
    expect(prisma.user.findFirst).toBeCalledWith({
      where: { username: 'c0d3r' }
    })
    expect(prisma.user.update).toBeCalled()
  })

  test('It should find a user with email if it is provided', async () => {
    nanoid.mockReturnValue('fake123')
    prisma.user.findFirst = jest.fn().mockResolvedValueOnce({
      id: 3
    })
    await expect(
      reqPwReset(() => {}, { userOrEmail: 'c0d3r@c0d3.com' }, ctx)
    ).resolves.toEqual({
      success: true
    })
    expect(prisma.user.findFirst).toBeCalledWith({
      where: { email: 'c0d3r@c0d3.com' }
    })
    expect(prisma.user.update).toBeCalled()
  })
  test('It should throw an error if user is not found', () => {
    prisma.user.findFirst = jest.fn().mockResolvedValueOnce(null)
    expect(
      reqPwReset(() => {}, { userOrEmail: 'badc0d3r' }, ctx)
    ).rejects.toThrowError('User does not exist')
  })
  test('It should log the error if an internal function fails', async () => {
    prisma.user.findFirst = jest.fn().mockRejectedValue(new Error())
    const errFunc = jest.fn()
    await expect(
      reqPwReset(
        () => {},
        { userOrEmail: 'worsec0d3r' },
        { req: { error: errFunc } }
      )
    ).rejects.toThrowError()

    expect(errFunc).toBeCalled()
  })
})

describe('Change Password', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const ctx = { req: { error: jest.fn(), session: {} } }

  test('It throws an error when session does not exist', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prisma.user.findUnique = jest.fn().mockResolvedValue(null)
    expect(
      changePw(
        () => {},
        { password: 'newpassword', token: sampleToken },
        { req: { error: jest.fn() } }
      )
    ).rejects.toThrowError('Session does not exist')
  })

  test('It throws an error if user is not found from token', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prisma.user.findUnique = jest.fn().mockResolvedValue(null)
    expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('User does not exist')
  })

  test('It throws an error if password does not match validation', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    expect(
      changePw(() => {}, { password: 'abc', token: sampleToken }, ctx)
    ).rejects.toThrowError('Password does not meet criteria')
  })

  test('It returns success when user id is found', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      id: 3,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken
    })
    expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).resolves.toEqual({ success: true })
  })

  test('It detects invalid forgotToken when it does not match', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    const sampleToken2 = encode({ userId: 3, userToken: 'abc211' })
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      id: 3,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken2
    })
    expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('Invalid Token')
  })

  test('It detects invalid forgotToken when token is expired', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      id: 3,
      tokenExpiration: new Date(Date.now() - 1000 * 60 * 60 * 24),
      forgotToken: sampleToken
    })
    expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('Invalid Token')
  })
})
