import { login, logout, signup, isTokenValid } from './resolvers/authController'
import {
  createChallenge,
  updateChallenge
} from './resolvers/challengesController'
import { userInfo } from './resolvers/userInfoController'
import { addAlert, removeAlert } from './resolvers/alertController'
import { reqPwReset, changePw } from './resolvers/passwordController'
import { addComment } from './resolvers/addComment'
import {
  createSubmission,
  acceptSubmission,
  rejectSubmission,
  submissions
} from './resolvers/submissionController'
import { setStar } from './resolvers/starsController'
import { alerts } from './resolvers/alerts'
import { lessons } from './resolvers/lessons'
import { session } from './resolvers/session'
import { allUsers } from './resolvers/allUsers'
import { getLessonMentors } from './resolvers/getLessonMentors'
import { changeAdminRights } from './resolvers/adminController'
import { createLesson, updateLesson } from './resolvers/lessonsController'
import { getPreviousSubmissions } from './resolvers/getPreviousSubmissions'
import { deleteComment } from './resolvers/deleteComment'
import {
  addModule,
  modules,
  updateModule,
  deleteModule
} from './resolvers/moduleCrud'
import {
  exercises,
  addExercise,
  updateExercise,
  deleteExercise,
  flagExercise,
  removeExerciseFlag
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
    updateModule,
    deleteModule,
    addComment,
    deleteComment,
    flagExercise,
    removeExerciseFlag
  }
}
