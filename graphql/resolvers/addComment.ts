import prisma from '../../prisma'
import { MutationAddCommentArgs } from '../index'
import { Context } from '../../@types/helpers'
import { getDiscordMessageUserIdString } from '../../helpers/getDiscordMessageUserIdString'
import { sendDirectMessage } from '../../helpers/discordBot'
import { MessageEmbedOptions } from 'discord.js'
import {
  C0D3_ICON_URL,
  CURRICULUM_URL,
  getLessonCoverPNG,
  PROFILE_URL
} from '../../constants'

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

  const { author, submission } = comment

  if (author.id !== submission.user.id && submission.user.discordId) {
    const notificationEmbed: MessageEmbedOptions = {
      color: '#5440d8',
      title: 'New comment on submission',
      url: `${CURRICULUM_URL}/${submission.lesson.slug}`,
      thumbnail: {
        url: getLessonCoverPNG(submission.lesson.order)
      },
      author: {
        name: author.name,
        url: `${PROFILE_URL}/${author.username}`,
        icon_url: C0D3_ICON_URL
      },
      description: `${getDiscordMessageUserIdString(
        author
      )} commented on your submission to the challenge **${
        submission.challenge.title
      }**${comment.line ? ` on **Line ${comment.line}**` : ''}.`,
      fields: [
        {
          name: 'Comment',
          value: comment.content
        }
      ]
    }

    await sendDirectMessage(submission.user.discordId, '', notificationEmbed)
  }

  return comment
}
