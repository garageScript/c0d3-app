import {
  SendChannelMessage,
  SendDirectMessage,
  SendLessonChannelMessage,
  SendSubmissionNotification
} from '../@types/discordBot'

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

export const sendChannelMessage: SendChannelMessage = async (
  channelId,
  message,
  embed
) =>
  fetch(`${messagesEndpoint}/channel/${channelId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      embed
    })
  }).then(r => r.json())

export const sendLessonChannelMessage: SendLessonChannelMessage = async (
  lessonId,
  message,
  embed
) =>
  fetch(`${messagesEndpoint}/lessonChannel/${lessonId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      embed
    })
  }).then(r => r.json())

export const sendDirectMessage: SendDirectMessage = async (
  userId,
  message,
  embed
) =>
  fetch(`${messagesEndpoint}/direct/${userId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      message,
      embed
    })
  }).then(r => r.json())

export const sendSubmissionNotification: SendSubmissionNotification = async (
  idType,
  userId,
  notificationLessonId,
  lessonId,
  challengeTitle
) =>
  await fetch(`${apiEndpoint}/submissions/notifications`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      idType,
      id: userId,
      notificationLessonId: notificationLessonId.toString(),
      lessonId: lessonId.toString(),
      challengeTitle
    })
  }).then(r => r.json())
