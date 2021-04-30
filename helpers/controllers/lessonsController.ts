import { Context } from '../../@types/helpers'
import type {
  CreateLessonMutation,
  CreateLessonMutationVariables,
  UpdateLessonMutation,
  UpdateLessonMutationVariables
} from '../../graphql'
import { lessons } from '../../graphql/queryResolvers/lessons'
import { prisma } from '../../prisma'
import { isAdmin } from '../isAdmin'
import { validateLessonId } from '../validateLessonId'

export const createLesson = async (
  _parent: void,
  arg: CreateLessonMutationVariables,
  ctx: Context
): Promise<CreateLessonMutation['createLesson']> => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }
    await prisma.lesson.create({ data: arg })
    return lessons()
  } catch (err) {
    throw new Error(err)
  }
}

export const updateLesson = async (
  _parent: void,
  arg: UpdateLessonMutationVariables,
  ctx: Context
): Promise<UpdateLessonMutation['updateLesson']> => {
  const { req } = ctx
  try {
    if (!isAdmin(req)) {
      throw new Error('User is not an admin')
    }
    const { id, ...data } = arg
    await validateLessonId(id)
    await prisma.lesson.update({ where: { id }, data })
    return lessons()
  } catch (err) {
    throw new Error(err)
  }
}
