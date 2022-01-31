import { Context } from '../../@types/helpers'
import type { MutationDeleteModuleArgs, MutationAddModuleArgs } from '..'
import prisma from '../../prisma'
import { isAdminOrThrow } from '../../helpers/isAdmin'

export const modules = async () => {
  return prisma.module.findMany({
    include: {
      author: true
    }
  })
}

export const addModule = async (
  _parent: void,
  args: MutationAddModuleArgs,
  ctx: Context
) => {
  //isAdminOrThrow(req) will add after, easier for testing
  // const authorId = ctx.req.user?.id
  const { authorId, content, lessonId, name } = args
  if (!authorId || !content || !name || !lessonId) {
    throw new Error('Missing parameters')
  }
  return await prisma.module.create({
    data: { authorId, content, lessonId, name }
  })
}

export const deleteModule = async (
  _parent: void,
  args: MutationDeleteModuleArgs,
  { req }: Context
) => {
  // isAdminOrThrow(req)
  const { id } = args
  if (!id) throw new Error('Missing parameter')
  await prisma.module.delete({ where: { id } })
  return { success: true }
}
