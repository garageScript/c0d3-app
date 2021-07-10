import { BotErrorType, IdType } from '../helpers/discordBot'

export type snowflake = string

interface BotErrorBase {
  type: BotErrorType
  message: string
}

export interface BotAuthError extends BotErrorBase {
  type: BotErrorType.auth_error
}

export interface BotValidationError extends BotErrorBase {
  type: BotErrorType.validation_error
  issues: { [key: string]: string }[]
}

export interface BotApiError extends BotErrorBase {
  type: BotErrorType.api_error
}

export type BotError = BotAuthError | BotValidationError | BotApiError

export type MessageResponse =
  | {
      id: snowflake
    }
  | BotError

export interface MessageEmbed {
  title?: string
  description?: string
  url?: string
  timestamp?: number
  color?: any
  fields?: any[]
  files?: any[]
  author?: any
  thumbnail?: any
  image?: any
  video?: any
  footer?: any
}

export type SendChannelMessage = (
  channelId: snowflake,
  message: string,
  embed?: MessageEmbed
) => Promise<MessageResponse>

export type SendLessonChannelMessage = (
  lessonId: number | string,
  message: string,
  embed?: MessageEmbed
) => Promise<MessageResponse>

export type SendDirectMessage = (
  userId: snowflake,
  message: string,
  embed?: MessageEmbed
) => Promise<MessageResponse>

export type SendSubmissionNotification = (
  idType: IdType,
  userId: snowflake | string,
  notificationLessonId: number | string,
  lessonId: number | string,
  challengeTitle: string
) => Promise<MessageResponse>
