import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'
import prisma from '../../prisma'
import { decode } from '../encoding'
import { CliToken } from '../../@types/user'

const userMiddleware = async (
  req: LoggedRequest,
  _: NextApiResponse,
  next: () => void
) => {
  req.user = null

  const auth = req.headers.authorization
  const cliToken = auth && auth.split(' ')[1]
  if (cliToken) {
    const decodedCliData: CliToken = decode(cliToken)

    const user = await prisma.user.findFirst({
      where: { cliToken: decodedCliData.cliToken }
    })

    if (user && decodedCliData?.cliVersion) {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          cliVersion: decodedCliData.cliVersion
        }
      })
    }

    req.user = user
    return next()
  }

  const { session } = req
  if (session?.userId) {
    const { userId: id } = session
    const user = await prisma.user.findUnique({ where: { id } })
    req.user = user
  }
  next()
}

export default userMiddleware
