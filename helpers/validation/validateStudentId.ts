import { LoggedRequest } from '../../@types/helpers'
import _ from 'lodash'

export const validateStudentId = (req: LoggedRequest, errMsg?: string) => {
  const studentId = _.get(req, 'user.id', false)
  if (!studentId) {
    throw new Error(errMsg || 'Student is not logged in')
  }
  return studentId
}
