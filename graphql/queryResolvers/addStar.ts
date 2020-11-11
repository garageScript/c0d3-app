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

  // Check if any fields are missing
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
  } catch (err) {
    req.error(err)
    throw new Error(err)
  }

  // Attempt to add Star into database
  try {
    await Star.create(arg)
    return { success: true }
  } catch (err) {
    req.error(err)
    throw new Error(`Failed to add Star into database ${err}`)
  }
}
