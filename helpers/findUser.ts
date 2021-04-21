import { prisma } from '../prisma'

export default async (userOrEmail: string) => {
  if (userOrEmail.indexOf('@') !== -1) {
    return prisma.user.findFirst({
      where: { email: userOrEmail }
    })
  }
  return prisma.user.findFirst({
    where: { username: userOrEmail }
  })
}
