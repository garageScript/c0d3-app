import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'
import db from '../dbload'

const { User } = db

export default async (
  req: LoggedRequest,
  _: NextApiResponse,
  next: () => void
) => {
  const { session } = req

  if (session) {
    const { userId } = session
    let user = userId ? await User.findOne({ where: { id: userId } }) : null
    if (user) user = user.dataValues
    req.user = user
  } else {
    req.user = null
  }
  next()
}
