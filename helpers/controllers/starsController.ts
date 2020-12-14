import db from '../dbload'
import { LoggedRequest } from '../../@types/helpers'
import { Star as StarType } from '../../@types/lesson'
import _ from 'lodash'
import { validateLessonId } from '../validateLessonId'
import { validateStudentId } from '../validation/validateStudentId'

const { Star } = db

interface StarsGivenType {
  lessonId: number
}

export const gaveLessonStar = async (
  _parent: void,
  arg: StarsGivenType,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const studentId = validateStudentId(req)
    const { lessonId } = arg
    await validateLessonId(lessonId)

    return await Star.findOne({ where: { studentId, lessonId } })
  } catch (err) {
    throw new Error(err)
  }
}

export const setStar = async (
  _parent: void,
  arg: StarType,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const studentId = validateStudentId(req)
    const { lessonId } = arg
    await validateLessonId(lessonId)

    const starsList = await Star.findAll({ where: { studentId, lessonId } })

    /*  If there is an element in starsList, then that means the student has already given
        a star to someone for this lessonId. Students can only give one star per lesson, so
        delete the previous star(s) already in the database before creating a new one
    */
    if (starsList.length) {
      await Star.destroy({ where: { studentId, lessonId } })
    }

    await Star.create({ ...arg, studentId })
    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw new Error(err)
  }
}
