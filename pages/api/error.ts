import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  throw new Error('API throw error test')
  res.status(200).json({ name: 'John Doe' })
}
export default withSentry(handler)
