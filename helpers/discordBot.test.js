process.env.C0D3R_ACCESS_TOKEN = 'cod3r:test'
process.env.C0D3R_URL = 'c0d3r.mock.url'

const {
  sendChannelMessage,
  sendLessonChannelMessage,
  sendDirectMessage,
  sendSubmissionNotification,
  IdType
} = require('./discordBot')

const messageResponse = { id: '123456' }

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(messageResponse)
  })
)

const apiEndpoint = `${process.env.C0D3R_URL}/api`
const messagesEndpoint = `${apiEndpoint}/messages`

const headers = {
  Authorization: `Bearer ${process.env.C0D3R_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
}

const mockData = {
  channelId: '1234',
  message: 'hello',
  embed: { description: 'an embed' },
  lessonId: 1,
  lessonSlug: 'js1',
  notificationLessonId: 2,
  idType: IdType.C0D3,
  userName: 'test_user',
  discordUserId: '9898',
  challengeTitle: 'test challenge'
}

const fetchOptions = {
  method: 'POST',
  headers
}

describe('sendChannelMessage', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendChannelMessage(
      mockData.channelId,
      mockData.message,
      mockData.embed
    )

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${messagesEndpoint}/channel/${mockData.channelId}`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          message: mockData.message,
          embed: mockData.embed
        })
      }
    )
  })
})

describe('sendLessonChannelMessage', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendLessonChannelMessage(
      mockData.lessonId,
      mockData.message,
      mockData.embed
    )

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${messagesEndpoint}/lessonChannel/${mockData.lessonId}`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          message: mockData.message,
          embed: mockData.embed
        })
      }
    )
  })
})

describe('sendDirectMessage', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendDirectMessage(
      mockData.discordUserId,
      mockData.message,
      mockData.embed
    )

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${messagesEndpoint}/direct/${mockData.discordUserId}`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          message: mockData.message,
          embed: mockData.embed
        })
      }
    )
  })
})

describe('sendSubmissionNotification', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendSubmissionNotification(
      mockData.idType,
      mockData.userName,
      mockData.notificationLessonId,
      mockData.lessonSlug,
      mockData.challengeTitle
    )

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${apiEndpoint}/submissions/notifications`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          idType: mockData.idType,
          id: mockData.userName,
          notificationLessonId: mockData.notificationLessonId.toString(),
          lessonSlug: mockData.lessonSlug,
          challengeTitle: mockData.challengeTitle
        })
      }
    )
  })
})
