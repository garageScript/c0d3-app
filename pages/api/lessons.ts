import * as getLessons from '../../graphql/queryResolvers/lessons'
import { LoggedRequest } from '../../@types/helpers'
import { NextApiResponse } from 'next'

const lessons = async (_: LoggedRequest, res: NextApiResponse) => {
  const allLessons = await getLessons.lessons()
  res.json(allLessons)
}
export default lessons
