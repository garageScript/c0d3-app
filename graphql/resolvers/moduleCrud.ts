import type {
  MutationDeleteModuleArgs,
  MutationAddModuleArgs,
  MutationUpdateModuleArgs
} from '..'
import prisma from '../../prisma'
import { Context } from '../../@types/helpers'
import { isAdminOrThrow } from '../../helpers/isAdmin'
import type { Module } from '@prisma/client'

export const modules = (): Promise<Module[]> => {
  return prisma.module.findMany({
    include: {
      author: true,
      lesson: true
    }
  })
}

export const addModule = async (
  _parent: void,
  args: MutationAddModuleArgs,
  ctx: Context
): Promise<Module> => {
  const { req } = ctx
  await isAdminOrThrow(req)
  const { content, lessonId, name, order } = args
  const authorId = req.user?.id
  if (!authorId) throw new Error('No User')
  return prisma.module.create({
    data: { authorId, content, lessonId, name, order },
    include: {
      author: true,
      lesson: true
    }
  })
}

export const updateModule = async (
  _parent: void,
  args: MutationUpdateModuleArgs,
  { req }: Context
): Promise<Module> => {
  isAdminOrThrow(req)
  const authorId = req.user?.id
  if (!authorId) throw new Error('No User')
  const { id, lessonId, name, content, order } = args
  return prisma.module.update({
    where: { id },
    data: { lessonId, name, content, order },
    include: {
      author: true,
      lesson: true
    }
  })
}

export const deleteModule = async (
  _parent: void,
  arg: MutationDeleteModuleArgs,
  ctx: Context
): Promise<Module> => {
  const { req } = ctx
  isAdminOrThrow(req)
  const authorId = req.user?.id
  if (!authorId) throw new Error('No User')
  const { id } = arg
  return prisma.module.delete({
    where: { id },
    include: {
      author: true,
      lesson: true
    }
  })
}
