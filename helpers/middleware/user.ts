import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'
import db from '../dbload'

const { User } = db

export default async (
  req: LoggedRequest,
  _: NextApiResponse,
  next: () => void
) => {
  req.user = null
  const { session } = req
  if (session && session.userId) {
    const { userId } = session
    const user = await User.findOne({ where: { id: userId } })
    req.user = user.dataValues
  }
  next()
}
