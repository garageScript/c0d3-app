import type {
  CreateLessonMutation,
  CreateLessonMutationVariables,
  UpdateLessonMutation,
  UpdateLessonMutationVariables
} from '../../graphql'
import { lessons } from './lessons'
import prisma from '../../prisma'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import { withAdminContainer } from '../../containers/withAdminContainer'

export const createLesson = withAdminContainer<
  Promise<CreateLessonMutation['createLesson']>,
  CreateLessonMutationVariables
>(async (_parent: void, args) => {
  await prisma.lesson.create({ data: args })
  return lessons()
})

export const updateLesson = withAdminContainer<
  Promise<UpdateLessonMutation['updateLesson']>,
  UpdateLessonMutationVariables
>(async (_parent: void, args) => {
  const { id, ...data } = args
  await validateLessonId(id)
  await prisma.lesson.update({ where: { id }, data })
  return lessons()
})
