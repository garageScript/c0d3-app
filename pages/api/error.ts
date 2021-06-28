import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'

export default async (_: LoggedRequest, res: NextApiResponse) => {
  throw new Error('API throw error test')
  res.status(200).json({ name: 'John Doe' })
}
