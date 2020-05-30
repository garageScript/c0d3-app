jest.mock('bcrypt')
jest.mock('mailgun-js')
jest.mock('nanoid')
jest.mock('../dbload')
jest.mock('../mail')
jest.mock('../mattermost')
import { nanoid } from 'nanoid'
import db from '../dbload'
import { changePw, reqPwReset } from './passwordController'
import { changeChatPassword } from '../mattermost'
import { encode } from '../encoding'

describe('Request Password Reset', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const { User } = db
  const ctx = { req: { error: jest.fn() } }

  test('It throws an error when user or email is not provided', () => {
    return expect(reqPwReset(() => {}, null, ctx)).rejects.toThrowError(
      'Please provide username or email'
    )
  })

  test('It should find a user with username if it is provided', async () => {
    const saveFunc = jest.fn()
    nanoid.mockReturnValue('fake123')
    User.findOne.mockResolvedValue({
      id: 3,
      save: saveFunc
    })
    const expectedEncodedToken = encode({ userId: 3, userToken: 'fake123' })
    await expect(
      reqPwReset(() => {}, { userOrEmail: 'c0d3r' }, ctx)
    ).resolves.toEqual({
      success: true,
      token: expectedEncodedToken
    })
    expect(User.findOne).toBeCalledWith({ where: { username: 'c0d3r' } })
    expect(saveFunc).toBeCalled()
  })

  test('It should find a user with email if it is provided', async () => {
    const saveFunc = jest.fn()
    nanoid.mockReturnValue('fake123')
    User.findOne.mockResolvedValue({
      id: 3,
      save: saveFunc
    })
    const expectedEncodedToken = encode({ userId: 3, userToken: 'fake123' })
    await expect(
      reqPwReset(() => {}, { userOrEmail: 'c0d3r@c0d3.com' }, ctx)
    ).resolves.toEqual({
      success: true,
      token: expectedEncodedToken
    })
    expect(User.findOne).toBeCalledWith({ where: { email: 'c0d3r@c0d3.com' } })
    expect(saveFunc).toBeCalled()
  })
  test('It should throw an error if user is not found', async () => {
    User.findOne.mockResolvedValue(null)
    return expect(
      reqPwReset(() => {}, { userOrEmail: 'badc0d3r' }, ctx)
    ).rejects.toThrowError('User does not exist')
  })
  test('It should log the error if an internal function fails', async () => {
    User.findOne.mockRejectedValue(1)
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
  const { User } = db

  test('It throws an error when session does not exist', async () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    User.findByPk.mockResolvedValue(null)
    return expect(
      changePw(
        () => {},
        { password: 'newpassword', token: sampleToken },
        { req: { error: jest.fn() } }
      )
    ).rejects.toThrowError('Session does not exist')
  })

  test('It throws an error if user is not found from token', async () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    User.findByPk.mockResolvedValue(null)
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('User does not exist')
  })

  test('It throws an error if password does not match validation', async () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    return expect(
      changePw(() => {}, { password: 'abc', token: sampleToken }, ctx)
    ).rejects.toThrowError('Password does not meet criteria')
  })

  test('It returns success when user id is found', async () => {
    changeChatPassword.mockResolvedValue(true)
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    User.findByPk.mockResolvedValue({
      id: 3,
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken,
      save: jest.fn()
    })
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).resolves.toEqual({ success: true })
  })

  test('It detects invalid forgotToken when it does not match', async () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    const sampleToken2 = encode({ userId: 3, userToken: 'abc211' })
    User.findByPk.mockResolvedValue({
      id: 3,
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken2
    })
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('Invalid Token')
  })

  test('It detects invalid forgotToken when token is expired', async () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    User.findByPk.mockResolvedValue({
      id: 3,
      expiration: new Date(Date.now() - 1000 * 60 * 60 * 24),
      forgotToken: sampleToken
    })
    return expect(
      changePw(() => {}, { password: 'newpassword', token: sampleToken }, ctx)
    ).rejects.toThrowError('Invalid Token')
  })

  test('It throws an error when mattermost fails to change password', () => {
    const sampleToken = encode({ userId: 3, userToken: 'abc123456' })
    changeChatPassword.mockRejectedValue(false)
    User.findByPk.mockResolvedValue({
      id: 3,
      expiration: new Date(Date.now() + 1000 * 60 * 60 * 24),
      forgotToken: sampleToken,
      save: jest.fn()
    })
    const testingArgs = {
      token: sampleToken,
      password: 'fakepassword101'
    }
    return expect(changePw(() => {}, testingArgs, ctx)).rejects.toThrowError(
      'Mattermost did not set password'
    )
  })
})
