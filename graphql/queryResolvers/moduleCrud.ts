import type { MutationDeleteModuleArgs, MutationAddModuleArgs } from '..'
import prisma from '../../prisma'

export const modules = async () => {
  return prisma.module.findMany({
    include: {
      author: true
    }
  })
}

export const addModule = async (_parent: void, args: MutationAddModuleArgs) => {
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
  args: MutationDeleteModuleArgs
) => {
  const { id } = args
  await prisma.module.delete({ where: { id } })
  return { success: true }
}
