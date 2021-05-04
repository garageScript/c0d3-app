import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'
import { prisma } from '../../prisma'

export default async (
  req: LoggedRequest,
  _: NextApiResponse,
  next: () => void
) => {
  req.user = null
  const { session } = req
  if (session && session.userId) {
    const { userId: id } = session
    const user = await prisma.user.findUnique({ where: { id } })
    req.user = user
  }
  next()
}
