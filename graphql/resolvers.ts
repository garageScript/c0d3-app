import {
  login,
  logout,
  signup,
  isTokenValid
} from '../helpers/controllers/authController'
import { userInfo } from '../helpers/controllers/userInfoController'
import { addAlert, removeAlert } from '../helpers/controllers/alertController'
import { reqPwReset, changePw } from '../helpers/controllers/passwordController'
import {
  createSubmission,
  acceptSubmission,
  rejectSubmission,
  submissions
} from '../helpers/controllers/submissionController'
import { alerts } from './queryResolvers/alerts'
import { lessons } from './queryResolvers/lessons'
import { session } from './queryResolvers/session'

export default {
  Query: {
    submissions,
    isTokenValid,
    userInfo,
    lessons,
    session,
    alerts
  },

  Mutation: {
    changePw,
    createSubmission,
    acceptSubmission,
    rejectSubmission,
    login,
    logout,
    signup,
    addAlert,
    removeAlert,
    reqPwReset
  }
}
