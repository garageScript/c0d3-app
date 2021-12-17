import prisma from '../../prisma'
import { Context } from '../../@types/helpers'
import { MutationCreateProjectArgs, Project } from '../../graphql'
import { isAdminOrThrow } from '../isAdmin'

export const createProject = async (
  _parent: void,
  args: MutationCreateProjectArgs,
  { req }: Context
): Promise<Project[]> => {
  isAdminOrThrow(req)

  await prisma.project.create({
    data: {
      title: args.title,
      description: args.description,
      slug: args.title.replace(/\s+/g, '-')
    }
  })

  const res = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      description: true
      // members: true TODO: add later, GQL User type does not match 1-to-1 with Prisma User type
    }
  })

  return res.map(r => {
    return {
      ...r,
      members: [] // Have to add this to conform to GQL type
    }
  })
}
