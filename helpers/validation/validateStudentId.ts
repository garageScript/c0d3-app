import { LoggedRequest } from '../../@types/helpers'
import _ from 'lodash'

export const validateStudentId = (req: LoggedRequest, errMsg?: string) => {
  try {
    const studentId = _.get(req, 'user.id', false)
    if (!studentId) {
      throw new Error(errMsg || 'Student is not logged in')
    }
    return studentId
  } catch (err) {
    throw new Error(err)
  }
}
