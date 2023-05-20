import prisma from '../../prisma'
import { InputMaybe, MutationAddCommentArgs } from '../index'
import { Context } from '../../@types/helpers'
import { getDiscordMessageUserIdString } from '../../helpers/getDiscordMessageUserIdString'
import { sendDirectMessage } from '../../helpers/discordBot'
import { APIEmbed } from 'discord.js'
import {
  C0D3_ICON_URL,
  CURRICULUM_URL,
  getLessonCoverPNG,
  PRIMARY_COLOR_HEX,
  PROFILE_URL
} from '../../constants'
import { Challenge, Comment, Lesson, Submission } from '@prisma/client'
import { MessageResponse } from '../../@types/discordBot'

type CommentWithAuthorAndSubmission = Comment & {
  author: {
    id: number
    username: string
    discordId: string | null
    name: string
  }
  submission: Submission & {
    user: { id: number; username: string; discordId: string | null }
    lesson: Lesson
    challenge: Challenge
  }
}

type SendNotificationsParams = {
  line: InputMaybe<number> | undefined
  fileName: InputMaybe<string> | undefined
  submissionId: number
  comment: CommentWithAuthorAndSubmission
}

const sendNotifications = async ({
  line,
  submissionId,
  fileName,
  comment
}: SendNotificationsParams) => {
  const restOfComments = await prisma.comment.findMany({
    where: {
      line,
      submissionId,
      fileName
    },
    select: {
      author: {
        select: {
          id: true,
          discordId: true
        }
      }
    },
    distinct: ['authorId']
  })

  const { submission, author } = comment

  const notificationEmbed = (forSubmissionOwner: boolean): APIEmbed => {
    const params = {
      title: forSubmissionOwner
        ? `New comment by a reviewer on submission`
        : `New comment on submission`,
      description: forSubmissionOwner
        ? 'commented on your submission to the'
        : 'added a comment on'
    }

    return {
      color: PRIMARY_COLOR_HEX,
      title: params.title,
      url: `${CURRICULUM_URL}/${submission.lesson.slug}`,
      thumbnail: {
        url: getLessonCoverPNG(submission.lesson.order)
      },
      author: {
        name: author.name,
        url: `${PROFILE_URL}/${author.username}`,
        icon_url: C0D3_ICON_URL
      },
      description: `${getDiscordMessageUserIdString(author)} ${
        params.description
      } challenge **${submission.challenge.title}**${
        comment.line ? ` on **Line ${comment.line}**` : ''
      }.`,
      fields: [
        {
          name: 'Comment',
          value: comment.content
        }
      ]
    }
  }

  // sends a notification to the submission author
  const sendNotificationToAuthor = async () => {
    if (author.id !== submission.user.id && submission.user.discordId) {
      await sendDirectMessage(
        submission.user.discordId,
        '',
        notificationEmbed(true)
      )
    }
  }

  // sends a notification to all of those who commented on
  // the same submission line except the comment author and the student who made the submission
  const sendNotificationsToParticipants = async () => {
    const notifications = restOfComments.reduce(
      (acc: Promise<MessageResponse>[], participant) => {
        const isCommentAuthor = participant.author.id === author.id
        const isSubmissionAuthor = participant.author.id === submission.user.id
        const hasDiscordId = participant.author.discordId

        if (isCommentAuthor || isSubmissionAuthor || !hasDiscordId) {
          return acc
        }

        acc.push(
          sendDirectMessage(
            participant.author.discordId,
            '',
            notificationEmbed(false)
          )
        )

        return acc
      },
      []
    )

    await Promise.all(notifications)
  }

  // schedule and await all notifications together
  await Promise.all([
    sendNotificationToAuthor(),
    sendNotificationsToParticipants()
  ])
}

export const addComment = async (
  _parent: void,
  arg: MutationAddCommentArgs,
  ctx: Context
) => {
  const { line, submissionId, fileName, content } = arg
  const authorId = ctx.req.user?.id
  if (!authorId) throw new Error('No authorId field')

  const comment = await prisma.comment.create({
    data: {
      line,
      submissionId,
      authorId,
      fileName,
      content
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          discordId: true,
          name: true
        }
      },
      submission: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              discordId: true
            }
          },
          lesson: true,
          challenge: true
        }
      }
    }
  })

  await sendNotifications({
    line,
    fileName,
    submissionId,
    comment
  })

  return comment
}
