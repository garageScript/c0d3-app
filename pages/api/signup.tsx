import cookies, { ResWithCookie } from '../../utils/cookies'
import { NextApiRequest } from 'next'

const handler = (req: NextApiRequest, res: ResWithCookie) => {
  const { username, email, password, firstName, lastName } = req.body
  res.cookie('user', username)
  res.json({
    username,
    email,
    password,
    firstName,
    lastName
  })
}

export default cookies(handler)
