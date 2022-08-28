import type {
  CreateChallengeMutationVariables,
  UpdateChallengeMutationVariables
} from '../../graphql'
import { lessons } from './lessons'
import prisma from '../../prisma'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import { withAdminContainer } from '../../containers/withAdminContainer'

export const createChallenge = withAdminContainer(
  async (_parent: void, arg: CreateChallengeMutationVariables) => {
    await validateLessonId(arg.lessonId)
    await prisma.challenge.create({ data: arg })
    return lessons()
  }
)

export const updateChallenge = withAdminContainer(
  async (_parent: void, arg: UpdateChallengeMutationVariables) => {
    const { id, lessonId, ...data } = arg
    await validateLessonId(lessonId)
    await prisma.challenge.update({
      where: { id },
      data
    })
    return lessons()
  }
)
