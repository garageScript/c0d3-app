/**
 * @jest-environment node
 */

jest.mock('bcrypt')
jest.mock('nanoid')
jest.mock('nodemailer')
jest.mock('../../helpers/mail')
import { nanoid } from 'nanoid'
import prismaMock from '../../__tests__/utils/prismaMock'
import { encode } from '../../helpers/encoding'
import { sendResetEmail } from '../../helpers/mail'
import { changePw, reqPwReset } from './passwordController'

const user = {
  id: 1,
  username: 'c0d3r',
  email: 'c0d3r@c0d3.com'
}

describe('Request Password Reset', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prismaMock.user.update.mockImplementation(args =>
      Promise.resolve({
        ...user,
        ...args.data
      })
    )
  })
  const ctx = { req: { error: jest.fn() } }

  test('It should find a user with username if it is provided', async () => {
    nanoid.mockReturnValue('fake123')
    prismaMock.user.findFirst.mockResolvedValueOnce(user)
    await expect(
      reqPwReset(() => {}, { userOrEmail: user.username }, ctx)
    ).resolves.toEqual({
      success: true
    })
    expect(prismaMock.user.findFirst).toBeCalledWith({
      where: { username: user.username }
    })
    expect(prismaMock.user.update).toBeCalled()
  })

  test('It should find a user with email if it is provided', async () => {
    nanoid.mockReturnValue('fake123')
    prismaMock.user.findFirst.mockResolvedValueOnce(user)
    await expect(
      reqPwReset(() => {}, { userOrEmail: user.email }, ctx)
    ).resolves.toEqual({
      success: true
    })
    expect(prismaMock.user.findFirst).toBeCalledWith({
      where: { email: user.email }
    })
    expect(prismaMock.user.update).toBeCalled()
  })
  test('It should throw an error if user is not found', () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null)
    return expect(
      reqPwReset(() => {}, { userOrEmail: 'badc0d3r' }, ctx)
    ).rejects.toThrowError('User does not exist')
  })
  test('It should throw an error if an internal function fails', async () => {
    prismaMock.user.findFirst.mockRejectedValue(new Error())
    const errFunc = jest.fn()
    await expect(
      reqPwReset(
        () => {},
        { userOrEmail: 'worsec0d3r' },
        { req: { error: errFunc } }
      )
    ).rejects.toThrowError()
  })

  it('should fail if email is not sent correctly', () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({ id: 3 })
    sendResetEmail.mockRejectedValue(Error('email not sent'))
    return expect(
      reqPwReset(() => {}, { userOrEmail: 'c0d3r' }, ctx)
    ).rejects.toThrowError(
      'Error while sending password recovery email, try again at some later time.'
    )
  })
})

describe('Change Password', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    prismaMock.user.update.mockImplementation(args =>
      Promise.resolve({
        ...user,
        ...args.data
      })
    )
  })
  const ctx = { req: { error: jest.fn(), session: {} } }

  test('It throws an error when session does not exist', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prismaMock.user.findUnique.mockResolvedValue(null)
    return expect(
      changePw(
        () => {},
        { password: 'newpassword', token: sampleToken },
        { req: { error: jest.fn() } }
      )
    ).rejects.toThrowError('Session does not exist')
  })

  test('It throws an error if user is not found from token', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prismaMock.user.findUnique.mockResolvedValue(null)
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('User does not exist')
  })

  test('It throws an error if password does not match validation', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    return expect(
      changePw(() => {}, { password: 'abc', token: sampleToken }, ctx)
    ).rejects.toThrowError('Password does not meet criteria')
  })

  test('It returns success when user id is found', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prismaMock.user.findUnique.mockResolvedValue({
      ...user,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken
    })
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).resolves.toEqual({ success: true })
  })

  test('It detects invalid forgotToken when it does not match', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    const sampleToken2 = encode({ userId: 3, userToken: 'abc211' })
    prismaMock.user.findUnique.mockResolvedValue({
      ...user,
      tokenExpiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken2
    })
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('Invalid Token')
  })

  test('It detects invalid forgotToken when token is expired', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    prismaMock.user.findUnique.mockResolvedValue({
      ...user,
      tokenExpiration: new Date(Date.now() - 1000 * 60 * 60 * 24),
      forgotToken: sampleToken
    })
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('Invalid Token')
  })
})
