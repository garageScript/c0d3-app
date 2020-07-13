import { LoggedRequest } from '../@types/helpers'
import { NextApiResponse } from 'next'
import db from '../helpers/dbload'

const { User } = db

export default async (
  req: LoggedRequest,
  _: NextApiResponse,
  next: () => void
) => {
  const userId = req.session

  if (!userId) {
    req.user = null
    return next()
  }

  const [user] = await User.findOne({ where: { id: userId } })

  req.user = user
  next()
}
