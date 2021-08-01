import { Context } from '../../@types/helpers'
import type {
  CreateLessonMutation,
  CreateLessonMutationVariables,
  UpdateLessonMutation,
  UpdateLessonMutationVariables
} from '../../graphql'
import { lessons } from '../../graphql/queryResolvers/lessons'
import prisma from '../../prisma'
import { checkIsAdmin } from '../isAdmin'
import { validateLessonId } from '../validateLessonId'

export const createLesson = async (
  _parent: void,
  arg: CreateLessonMutationVariables,
  { req }: Context
): Promise<CreateLessonMutation['createLesson']> => {
  checkIsAdmin(req)
  await prisma.lesson.create({ data: arg })
  return lessons()
}

export const updateLesson = async (
  _parent: void,
  arg: UpdateLessonMutationVariables,
  { req }: Context
): Promise<UpdateLessonMutation['updateLesson']> => {
  checkIsAdmin(req)
  const { id, ...data } = arg
  await validateLessonId(id)
  await prisma.lesson.update({ where: { id }, data })
  return lessons()
}
