jest.mock('node-fetch')
import fetch from 'node-fetch'
import { chatSignUp, changeChatPassword } from './mattermost'

describe('Chat Signup', () => {
  let userArgs

  beforeEach(() => {
    jest.clearAllMocks()
    userArgs = {
      username: 'testuser',
      password: 'c0d3reallyhard',
      email: 'testuser@c0d3.com'
    }
  })

  test('ChatSignUp - should resolve if response is 201', async () => {
    fetch.mockResolvedValue({ status: 201 })
    return expect(
      chatSignUp(userArgs.username, userArgs.password, userArgs.email)
    ).resolves.toEqual({ success: true })
  })

  test('ChatSignUp - should reject with invalid parameter if response is 400', async () => {
    fetch.mockResolvedValue({ status: 400 })
    return expect(
      chatSignUp(userArgs.username, userArgs.password, userArgs.email)
    ).rejects.toThrowError('Invalid or missing parameter in mattermost request')
  })

  test('ChatSignUp - should reject with invalid permission if response is 403', async () => {
    fetch.mockResolvedValue({ status: 403 })
    return expect(
      chatSignUp(userArgs.username, userArgs.password, userArgs.email)
    ).rejects.toThrowError('Invalid permission')
  })

  test('ChatSignUp - should reject if response status is invalid', async () => {
    fetch.mockResolvedValue({ status: 418 }) // MatterMost only returns 201, 400 and 403 LOL teapot
    return expect(
      chatSignUp(userArgs.username, userArgs.password, userArgs.email)
    ).rejects.toThrowError('Unexpected Response')
  })

  test('ChatSignUp - should reject if internal server error', async () => {
    fetch.mockRejectedValue('')
    return expect(
      chatSignUp(userArgs.username, userArgs.password, userArgs.email)
    ).rejects.toThrowError('Internal Server Error')
  })
})

describe('Change Password Function', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('ChatChangePassword - should reject if email is not found in Mattermost', async () => {
    // The first fetch gets the ID from mattermost
    fetch.mockResolvedValueOnce({ status: 400 })
    return expect(
      changeChatPassword('email@c0d3.com', 'fakepassword')
    ).rejects.toThrowError('Invalid Email')
  })

  test('ChatChangePassword - should call fetch twice for successful password change', async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: () => ({
        id: 32
      })
    })

    fetch.mockResolvedValueOnce({
      status: 200
    })

    await changeChatPassword('email@c0d3.com', 'fakepassword')
    expect(fetch.mock.calls[0][0]).toEqual(
      'https://mattermost.devwong.com/api/v4/users/email/email@c0d3.com'
    )
    expect(fetch.mock.calls[0][1]).toEqual({
      headers: { Authorization: 'Bearer 123' }
    })
    expect(fetch.mock.calls[1][0]).toEqual(
      'https://mattermost.devwong.com/api/v4/users/32/password'
    )
    expect(fetch.mock.calls[1][1]).toEqual({
      method: 'PUT',
      headers: { Authorization: 'Bearer 123' },
      body: JSON.stringify({
        new_password: 'fakepassword'
      })
    })
  })

  test('ChatChangePassword - should reject for unsuccessful password change', async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: () => ({
        id: 32
      })
    })

    fetch.mockResolvedValueOnce({
      status: 400
    })

    return expect(
      changeChatPassword('email@c0d3.com', 'fakepassword')
    ).rejects.toThrowError()
  })
})
