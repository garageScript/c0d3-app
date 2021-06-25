import { prisma } from '../../prisma'
import { QueryGetPreviousSubmissionsArgs } from '../../graphql'
import { Context } from '../../@types/helpers'

export const getPreviousSubmissions = async (
  _parent: void,
  arg: QueryGetPreviousSubmissionsArgs,
  _ctx: Context
) => {
  const { lessonId, challengeId, userId } = arg
  const submissions = await prisma.submission.findMany({
    where: {
      lessonId,
      challengeId,
      user: {
        id: userId
      }
    },
    include: {
      challenge: true,
      user: true,
      reviewer: true,
      comments: {
        include: {
          author: true
        }
      }
    }
  })
  return submissions
}
