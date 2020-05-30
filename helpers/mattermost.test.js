jest.mock('node-fetch')
import fetch from 'node-fetch'
import {
  chatSignUp,
  getChannelInfo,
  getUserByEmail,
  publicChannelMessage
} from './mattermost'

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

describe('Get Channel Info', () => {
  let channelInfo
  beforeEach(() => {
    jest.clearAllMocks()
    channelInfo = {
      status: 200,
      json: () => Promise.resolve(JSON.stringify({ id: 'fakeId' }))
    }
  })

  test('GetChannelInfo - should resolve if response is 200', async () => {
    fetch.mockResolvedValue(channelInfo)
    expect(await getChannelInfo('fakeChatName')).toBe(
      JSON.stringify({ id: 'fakeId' })
    )
  })

  test('GetChannelInfo - should reject if response is not 200', async () => {
    const res = { status: 404, statusText: 'Error message' }
    fetch.mockResolvedValue(res)
    await expect(getChannelInfo('invalidChatName')).rejects.toThrowError(
      res.statusText
    )
  })

  test('GetChannelInfo - should return the correct URL', async () => {
    const fakeProdURL =
      'https://c0d3.com/fake/url/teams/name/c0d3/channels/name/fakeChatName'
    process.env.NODE_ENV = 'production'
    process.env.CHAT_URL = 'https://c0d3.com/fake/url'
    fetch.mockResolvedValue(channelInfo)
    await getChannelInfo('fakeChatName')

    expect(fetch.mock.calls[0][0]).toBe(fakeProdURL)
  })
})

describe('Public Channel Message', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should call sendMessage', async () => {
    fetch.mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ id: 'fakeId' })
    })
    await publicChannelMessage('fakeChannelName', 'fakeMessage')
    expect(fetch.mock.calls[1][1].body).toEqual(
      JSON.stringify({ channel_id: 'fakeId', message: 'fakeMessage' })
    )
  })

  test('Should throw error', () => {
    fetch.mockRejectedValue('errorMessage')
    expect(
      publicChannelMessage('fakeChannelName', 'fakeMessage')
    ).rejects.toThrowError('errorMessage')
  })
})

describe('getUserByEmail', () => {
  test('Should throw error', () => {
    fetch.mockRejectedValue('errorMessage')
    expect(getUserByEmail('fakeEmail')).rejects.toThrowError('errorMessage')
  })
})
