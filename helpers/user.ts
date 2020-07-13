import { LoggedRequest } from '../@types/helpers'
import { NextApiResponse } from 'next'
import db from '../helpers/dbload'

const { User } = db

export default async (
  req: LoggedRequest,
  _: NextApiResponse,
  next: () => void
) => {
  const { session } = req

  if (session) {
    const { userId } = session
    req.user = userId ? await User.findOne({ where: { id: userId } }) : null
  } else {
    req.user = null
  }

  next()
}
