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

const channelId = '1234'
const message = 'hello'
const embed = { description: 'an embed' }
const lessonId = 1
const notificationLessonId = 2
const idType = IdType.C0D3
const userName = 'test_user'
const discordUserId = '9898'
const challengeTitle = 'test challenge'

const fetchOptions = {
  method: 'POST',
  headers
}

describe('sendChannelMessage', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendChannelMessage(channelId, message, embed)

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${messagesEndpoint}/channel/${channelId}`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          message,
          embed
        })
      }
    )
  })
})

describe('sendLessonChannelMessage', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendLessonChannelMessage(lessonId, message, embed)

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${messagesEndpoint}/lessonChannel/${lessonId}`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          message,
          embed
        })
      }
    )
  })
})

describe('sendDirectMessage', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendDirectMessage(discordUserId, message, embed)

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${messagesEndpoint}/direct/${discordUserId}`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          message,
          embed
        })
      }
    )
  })
})

describe('sendSubmissionNotification', () => {
  it('should call fetch with the correct options', async () => {
    const response = await sendSubmissionNotification(
      idType,
      userName,
      notificationLessonId,
      lessonId,
      challengeTitle
    )

    expect(response).toEqual(messageResponse)
    expect(fetch).toHaveBeenCalledWith(
      `${apiEndpoint}/submissions/notifications`,
      {
        ...fetchOptions,
        body: JSON.stringify({
          idType,
          id: userName,
          lessonId: lessonId.toString(),
          challengeTitle
        })
      }
    )
  })
})
