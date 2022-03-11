import { Context } from '../../@types/helpers'
import type {
  CreateChallengeMutationVariables,
  UpdateChallengeMutationVariables
} from '../../graphql'
import { lessons } from '../../graphql/resolvers/lessons'
import prisma from '../../prisma'
import { isAdminOrThrow } from '../isAdmin'
import { validateLessonId } from '../validation/validateLessonId'

export const createChallenge = async (
  _parent: void,
  arg: CreateChallengeMutationVariables,
  ctx: Context
) => {
  const { req } = ctx

  isAdminOrThrow(req)
  await validateLessonId(arg.lessonId)
  await prisma.challenge.create({ data: arg })
  return lessons()
}

export const updateChallenge = async (
  _parent: void,
  arg: UpdateChallengeMutationVariables,
  ctx: Context
) => {
  const { req } = ctx

  isAdminOrThrow(req)
  const { id, lessonId, ...data } = arg
  await validateLessonId(lessonId)
  await prisma.challenge.update({
    where: { id },
    data
  })
  return lessons()
}
