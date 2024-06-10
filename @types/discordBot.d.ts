import { BotErrorType, IdType } from '../helpers/discordBot'

// snowflake: type alias for string, to make clear the string of this type
// should be in the snowflake format and not an arbitrary string
// https://en.wikipedia.org/wiki/Snowflake_ID
// APIEmbed: interface for the object that can be sent as a discord
// message embed
import { snowflake, APIEmbed } from 'discord.js'

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
  | { status: 'sending' }
  | { id: snowflake }
  | BotError

export type PostBot = (endpoint: string, body: object) => Promise

export type SendChannelMessage = (
  channelId: snowflake,
  message: string,
  embed?: APIEmbed,
  includeDetails?: boolean
) => Promise<MessageResponse>

export type SendLessonChannelMessage = (
  lessonId: number | string,
  message: string,
  embed?: APIEmbed,
  includeDetails?: boolean
) => Promise<MessageResponse>

export type SendDirectMessage = (
  userId: snowflake,
  message: string,
  embed?: APIEmbed,
  includeDetails?: boolean
) => Promise<MessageResponse>

export type SendSubmissionNotification = (
  idType: IdType,
  userId: snowflake | string,
  notificationLessonId: number | string,
  lessonSlug: string,
  challengeTitle: string,
  includeDetails?: boolean
) => Promise<MessageResponse>
