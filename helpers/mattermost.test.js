/**
 * @jest-environment node
 */

jest.mock('node-fetch')
import fetch from 'node-fetch'
import {
  chatSignUp,
  changeChatPassword,
  getChannelInfo,
  getUserByEmail,
  getChatUserById,
  publicChannelMessage,
  findOrCreateDirectMessageChannel,
  sendDirectMessage
} from './mattermost'

const userMock = {
  username: 'fakeuser',
  id: 'fakeid123456',
  email: 'fake@email.com'
}

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

  test('Should return user info', async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve(userMock)
    })
    return expect(getUserByEmail('fakeemail')).resolves.toEqual(userMock)
  })
})

describe('getChatUserById', () => {
  beforeEach(() => {
    getChatUserById.cache.clear()
    jest.clearAllMocks()
  })

  test('Should return user info', async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve(userMock)
    })
    await expect(getChatUserById(userMock.id)).resolves.toEqual(userMock)
  })

  test('Should throw error when id is not found', async () => {
    fetch.mockRejectedValue('errorMessage')
    await expect(getChatUserById(userMock.id)).rejects.toThrowError()
  })

  test('Should memoize the result when called with the same id', async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve(userMock)
    })
    await expect(getChatUserById(userMock.id)).resolves.toEqual(userMock)
    await expect(getChatUserById(userMock.id)).resolves.toEqual(userMock)
    expect(fetch).toBeCalledTimes(1)
  })
})

describe('findOrCreateDirectMessageChannel', () => {
  beforeEach(() => {
    findOrCreateDirectMessageChannel.cache.clear()
    jest.clearAllMocks()
  })

  test('Should return the direct message channel id', async () => {
    const res = {
      id: 'channelid12345'
    }
    fetch.mockResolvedValue({
      json: () => Promise.resolve(res)
    })
    await expect(
      findOrCreateDirectMessageChannel('senderId', 'receiverId')
    ).resolves.toEqual(res)
  })

  test('Should throw error', async () => {
    fetch.mockRejectedValue('errorMessage')
    await expect(
      findOrCreateDirectMessageChannel('senderId', 'receiverId')
    ).rejects.toThrowError()
  })
})

describe('sendDirectMessage', () => {
  beforeEach(() => jest.clearAllMocks())

  test('Should call sendMessage with the right parameters', async () => {
    const message = 'this is a test'
    const userId = 'fakeuserid'
    const botId = 'fakebotid'
    const channelId = 'fakechannelid'
    fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve({ id: botId }) })
      .mockResolvedValueOnce({ json: () => Promise.resolve({ id: channelId }) })
      .mockResolvedValueOnce({ status: 200 })
    await sendDirectMessage(userId, message)
    expect(fetch.mock.calls[2][1].body).toEqual(
      JSON.stringify({ channel_id: channelId, message })
    )
  })
})
