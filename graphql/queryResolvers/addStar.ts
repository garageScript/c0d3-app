import db from '../../helpers/dbload'
import { LoggedRequest } from '../../@types/helpers'
import { Star as StarType } from '../../@types/lesson'

const { Star } = db

export const addStar = async (
  _parent: void,
  arg: StarType,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const { studentId, mentorId, lessonId } = arg
    if (!studentId) {
      throw new Error('Missing or invalid studentId')
    }
    if (!mentorId) {
      throw new Error('Missing or invalid mentorId')
    }
    if (!lessonId) {
      throw new Error('Missing or invalid lessonId')
    }

    await Star.create(arg)
    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw new Error(err)
  }
}
