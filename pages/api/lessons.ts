import { lessons } from '../../graphql/queryResolvers/lessons'
import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'

export default async (_: LoggedRequest, res: NextApiResponse) => {
  const allLessons = await lessons()
  res.status(200)
  res.json(allLessons)
}
