import { Context } from '../../@types/helpers'
import type {
  CreateLessonMutation,
  CreateLessonMutationVariables,
  UpdateLessonMutation,
  UpdateLessonMutationVariables
} from '../../graphql'
import { lessons } from './lessons'
import prisma from '../../prisma'
import { isAdminOrThrow } from '../../helpers/isAdmin'
import { validateLessonId } from '../../helpers/validation/validateLessonId'

export const createLesson = async (
  _parent: void,
  arg: CreateLessonMutationVariables,
  { req }: Context
): Promise<CreateLessonMutation['createLesson']> => {
  isAdminOrThrow(req)
  await prisma.lesson.create({ data: arg })
  return lessons()
}

export const updateLesson = async (
  _parent: void,
  arg: UpdateLessonMutationVariables,
  { req }: Context
): Promise<UpdateLessonMutation['updateLesson']> => {
  isAdminOrThrow(req)
  const { id, ...data } = arg
  await validateLessonId(id)
  await prisma.lesson.update({ where: { id }, data })
  return lessons()
}
