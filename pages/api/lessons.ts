import { lessons } from '../../graphql/queryResolvers/lessons'
import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'

export default async (_: LoggedRequest, res: NextApiResponse) => {
  try {
    const allLessons = await lessons()
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json(allLessons)
  } catch (err) {
    res.status(500).json('Error occured 😮')
  }
}
