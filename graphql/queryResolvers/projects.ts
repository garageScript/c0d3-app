import prisma from '../../prisma'

export const projects = async () => {
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
