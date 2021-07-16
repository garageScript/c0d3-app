import {
  PostBot,
  SendChannelMessage,
  SendDirectMessage,
  SendLessonChannelMessage,
  SendSubmissionNotification
} from '../@types/discordBot'

// Documentation for c0d3r api: https://github.com/garageScript/c0d3r/wiki/C0D3R-Api-Documentation

export enum IdType {
  C0D3 = 'C0D3',
  DISCORD = 'DISCORD'
}

export enum BotErrorType {
  auth_error = 'auth_error',
  validation_error = 'validation_error',
  api_error = 'api_error'
}

const apiEndpoint = `${process.env.C0D3R_URL}/api`
const messagesEndpoint = `${apiEndpoint}/messages`

const headers = {
  Authorization: `Bearer ${process.env.C0D3R_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
}

export const postBot: PostBot = async (endpoint, body) =>
  fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
    .then(r => r.json())
    .catch(console.error)

export const sendChannelMessage: SendChannelMessage = async (
  channelId,
  message,
  embed,
  includeDetails
) =>
  postBot(`${messagesEndpoint}/channel/${channelId}`, {
    message,
    embed,
    includeDetails
  })

export const sendLessonChannelMessage: SendLessonChannelMessage = async (
  lessonId,
  message,
  embed,
  includeDetails
) =>
  postBot(`${messagesEndpoint}/lessonChannel/${lessonId}`, {
    message,
    embed,
    includeDetails
  })

export const sendDirectMessage: SendDirectMessage = async (
  userId,
  message,
  embed,
  includeDetails
) =>
  postBot(`${messagesEndpoint}/direct/${userId}`, {
    message,
    embed,
    includeDetails
  })

export const sendSubmissionNotification: SendSubmissionNotification = async (
  idType,
  userId,
  notificationLessonId,
  lessonId,
  challengeTitle,
  includeDetails
) =>
  postBot(`${apiEndpoint}/submissions/notifications`, {
    idType,
    id: userId,
    notificationLessonId: notificationLessonId.toString(),
    lessonId: lessonId.toString(),
    challengeTitle,
    includeDetails
  })
