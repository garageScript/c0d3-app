import { LoggedRequest } from '../@types/helpers'
import _ from 'lodash'

export const isAdmin = (req: LoggedRequest) => {
  return _.get(req, 'user.isAdmin', false) === 'true'
}
