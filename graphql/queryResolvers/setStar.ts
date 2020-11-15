import db from '../../helpers/dbload'
import { LoggedRequest } from '../../@types/helpers'
import { Star as StarType } from '../../@types/lesson'
import _ from 'lodash'

const { Star } = db

export const setStar = async (
  _parent: void,
  arg: StarType,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const studentId = _.get(req, 'user.id', false)
    if (!studentId) {
      throw new Error('Student is not logged in')
    }

    const { mentorId, lessonId } = arg
    if (!mentorId) {
      throw new Error('Missing or invalid mentorId')
    }
    if (!lessonId) {
      throw new Error('Missing or invalid lessonId')
    }

    const lookupData = { where: { studentId, lessonId } }
    const starsList = await Star.findAll(lookupData)

    // If there is an element in starsList, then that means the student has already given
    // a star to someone for this lessonId. Students can only give one star per lesson, so
    // delete the previous star already in the database before creating a new one
    if (starsList.length) {
      Star.destroy(lookupData)
    }

    await Star.create({ ...arg, studentId })
    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw new Error(err)
  }
}
