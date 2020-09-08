import { lessons } from '../../graphql/queryResolvers/lessons'
import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'

export default async (_: LoggedRequest, res: NextApiResponse) => {
  try {
    const allLessons = await lessons()
    res.status(200)
    res.json(allLessons)
  } catch (err) {
    res.status(500)
    res.json('Error occured :(')
  }
}
