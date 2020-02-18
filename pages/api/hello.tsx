import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req.cookies

  res.send(`Hello ${user}! From c0d3.com`)
}
