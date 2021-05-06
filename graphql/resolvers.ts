import {
  login,
  logout,
  signup,
  isTokenValid
} from '../helpers/controllers/authController'
import {
  createChallenge,
  updateChallenge
} from '../helpers/controllers/challengesController'
import { userInfo } from '../helpers/controllers/userInfoController'
import { addAlert, removeAlert } from '../helpers/controllers/alertController'
import { reqPwReset, changePw } from '../helpers/controllers/passwordController'
import {
  createSubmission,
  acceptSubmission,
  rejectSubmission,
  submissions,
  commentSubmission
} from '../helpers/controllers/submissionController'
import { setStar } from '../helpers/controllers/starsController'
import { alerts } from './queryResolvers/alerts'
import { lessons } from './queryResolvers/lessons'
import { session } from './queryResolvers/session'
import { allUsers } from './queryResolvers/allUsers'
import { getComments } from './queryResolvers/getComments'
import { getLessonMentors } from './queryResolvers/getLessonMentors'
import { changeAdminRights } from '../helpers/controllers/adminController'
import {
  createLesson,
  updateLesson
} from '../helpers/controllers/lessonsController'

export default {
  Query: {
    submissions,
    getLessonMentors,
    allUsers,
    isTokenValid,
    userInfo,
    lessons,
    session,
    alerts,
    getComments
  },

  Mutation: {
    setStar,
    changePw,
    changeAdminRights,
    createSubmission,
    acceptSubmission,
    rejectSubmission,
    commentSubmission,
    createLesson,
    updateLesson,
    login,
    logout,
    signup,
    addAlert,
    removeAlert,
    reqPwReset,
    createChallenge,
    updateChallenge
  }
}
