import type { MutationDeleteModuleArgs, MutationAddModuleArgs } from '..'
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
  const { content, lessonId, name } = args
  const authorId = req.user?.id
  if (!authorId) throw new Error('No User')
  return prisma.module.create({
    data: { authorId, content, lessonId, name },
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
