import { login, logout, signup, isTokenValid } from './resolvers/authController'
import {
  createChallenge,
  updateChallenge
} from './resolvers/challengesController'
import { userInfo } from '../helpers/controllers/userInfoController'
import { addAlert, removeAlert } from './resolvers/alertController'
import { reqPwReset, changePw } from '../helpers/controllers/passwordController'
import { addComment } from './resolvers/addComment'
import {
  createSubmission,
  acceptSubmission,
  rejectSubmission,
  submissions
} from '../helpers/controllers/submissionController'
import { setStar } from '../helpers/controllers/starsController'
import { alerts } from './resolvers/alerts'
import { lessons } from './resolvers/lessons'
import { session } from './resolvers/session'
import { allUsers } from './resolvers/allUsers'
import { getLessonMentors } from './resolvers/getLessonMentors'
import { changeAdminRights } from './resolvers/adminController'
import { createLesson, updateLesson } from './resolvers/lessonsController'
import { getPreviousSubmissions } from './resolvers/getPreviousSubmissions'
import { deleteComment } from './resolvers/deleteComment'
import { addModule, modules, deleteModule } from './resolvers/moduleCrud'
import {
  exercises,
  addExercise,
  updateExercise,
  deleteExercise
} from './resolvers/exerciseCrud'
export default {
  Query: {
    submissions,
    getLessonMentors,
    allUsers,
    isTokenValid,
    userInfo,
    lessons,
    exercises,
    modules,
    session,
    alerts,
    getPreviousSubmissions
  },

  Mutation: {
    setStar,
    changePw,
    changeAdminRights,
    createSubmission,
    acceptSubmission,
    rejectSubmission,
    createLesson,
    updateLesson,
    addExercise,
    updateExercise,
    deleteExercise,
    login,
    logout,
    signup,
    addAlert,
    removeAlert,
    reqPwReset,
    createChallenge,
    updateChallenge,
    addModule,
    deleteModule,
    addComment,
    deleteComment
  }
}
