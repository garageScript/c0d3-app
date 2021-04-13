import { LoggedRequest } from '../@types/helpers'
import _ from 'lodash'

export const isAdmin = (req: LoggedRequest) =>
  _.get(req, 'user.isAdmin', false) as boolean
