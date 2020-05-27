jest.mock('node-fetch')
import fetch from 'node-fetch'
import { chatSignUp } from './mattermost'

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

  test('ChatSignUp - should reject with invalid parameter if response is 401', async () => {
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
    fetch.mockResolvedValue({ status: 418 }) // MatterMost only returns 201, 401 and 403 LOL teapot
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
