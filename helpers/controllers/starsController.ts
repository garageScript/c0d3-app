import db from '../dbload'
import { LoggedRequest } from '../../@types/helpers'
import { Star as StarType } from '../../@types/lesson'
import _ from 'lodash'
import { validateLessonId } from '../validateLessonId'
import { validateStudentId } from '../validation/validateStudentId'
import { getUserByEmail, publicChannelMessage } from '../mattermost'

const { Star, Lesson, User } = db

export const setStar = async (
  _parent: void,
  arg: StarType,
  ctx: { req: LoggedRequest }
) => {
  const { req } = ctx
  try {
    const studentId = validateStudentId(req)
    const { lessonId, mentorId } = arg
    await validateLessonId(lessonId)

    const lookupData = { where: { studentId, lessonId } }
    const starsList = await Star.findAll(lookupData)
    /*
      If there is an element in starsList, then that means the student has already given
      a star to someone for this lessonId. Students can only give one star per lesson, so
      delete the previous star(s) already in the database before creating a new one
    */
    if (starsList.length) {
      await Star.destroy(lookupData)
    }

    await Star.create({ ...arg, studentId })

    const [{ chatUrl }, { email }] = await Promise.all([
      Lesson.findByPk(lessonId, { raw: true }),
      User.findByPk(mentorId, { raw: true })
    ])

    const channelName = chatUrl.split('/').pop()
    const { username } = await getUserByEmail(email)
    publicChannelMessage(channelName, `@${username} received a star!`)
    return { success: true }
  } catch (err) {
    req.error(`Failed to add Star into Database: ${err}`)
    throw new Error(err)
  }
}
