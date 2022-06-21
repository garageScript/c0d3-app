import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../@types/helpers'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHoc from '@apollo/client/react/hoc'
import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy
} from '@apollo/client/cache'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Alert = {
  __typename?: 'Alert'
  id: Scalars['Int']
  text?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  urlCaption?: Maybe<Scalars['String']>
}

export type AuthResponse = {
  __typename?: 'AuthResponse'
  cliToken?: Maybe<Scalars['String']>
  error?: Maybe<Scalars['String']>
  success?: Maybe<Scalars['Boolean']>
  username?: Maybe<Scalars['String']>
}

export type Challenge = {
  __typename?: 'Challenge'
  description: Scalars['String']
  id: Scalars['Int']
  lessonId: Scalars['Int']
  order: Scalars['Int']
  title: Scalars['String']
}

export type Comment = {
  __typename?: 'Comment'
  author?: Maybe<User>
  authorId: Scalars['Int']
  content: Scalars['String']
  createdAt: Scalars['String']
  fileName?: Maybe<Scalars['String']>
  id: Scalars['Int']
  line?: Maybe<Scalars['Int']>
  submission?: Maybe<Submission>
  submissionId: Scalars['Int']
}

export type Exercise = {
  __typename?: 'Exercise'
  answer: Scalars['String']
  author: User
  description: Scalars['String']
  explanation?: Maybe<Scalars['String']>
  id: Scalars['Int']
  module: Module
  testStr?: Maybe<Scalars['String']>
}

export type Lesson = {
  __typename?: 'Lesson'
  challenges: Array<Challenge>
  chatUrl?: Maybe<Scalars['String']>
  currentUser?: Maybe<User>
  description: Scalars['String']
  docUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  id: Scalars['Int']
  order: Scalars['Int']
  slug: Scalars['String']
  title: Scalars['String']
  users?: Maybe<Array<Maybe<User>>>
  videoUrl?: Maybe<Scalars['String']>
}

export type Module = {
  __typename?: 'Module'
  author: User
  content: Scalars['String']
  id: Scalars['Int']
  lesson: Lesson
  name: Scalars['String']
  order: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  acceptSubmission?: Maybe<Submission>
  addAlert?: Maybe<Array<Maybe<Alert>>>
  addComment?: Maybe<Comment>
  addExercise: Exercise
  addModule: Module
  changeAdminRights?: Maybe<SuccessResponse>
  changePw?: Maybe<AuthResponse>
  createChallenge?: Maybe<Array<Maybe<Lesson>>>
  createLesson: Array<Lesson>
  createSubmission?: Maybe<Submission>
  deleteComment?: Maybe<Comment>
  deleteExercise: Exercise
  deleteModule: Module
  login?: Maybe<AuthResponse>
  logout?: Maybe<AuthResponse>
  rejectSubmission?: Maybe<Submission>
  removeAlert?: Maybe<SuccessResponse>
  reqPwReset: SuccessResponse
  setStar: SuccessResponse
  signup?: Maybe<AuthResponse>
  updateChallenge?: Maybe<Array<Maybe<Lesson>>>
  updateExercise: Exercise
  updateLesson: Array<Lesson>
  updateModule: Module
}

export type MutationAcceptSubmissionArgs = {
  comment: Scalars['String']
  id: Scalars['Int']
  lessonId: Scalars['Int']
}

export type MutationAddAlertArgs = {
  text: Scalars['String']
  type: Scalars['String']
  url?: InputMaybe<Scalars['String']>
  urlCaption?: InputMaybe<Scalars['String']>
}

export type MutationAddCommentArgs = {
  content: Scalars['String']
  fileName?: InputMaybe<Scalars['String']>
  line?: InputMaybe<Scalars['Int']>
  submissionId: Scalars['Int']
}

export type MutationAddExerciseArgs = {
  answer: Scalars['String']
  description: Scalars['String']
  explanation?: InputMaybe<Scalars['String']>
  moduleId: Scalars['Int']
  testStr?: InputMaybe<Scalars['String']>
}

export type MutationAddModuleArgs = {
  content: Scalars['String']
  lessonId: Scalars['Int']
  name: Scalars['String']
  order: Scalars['Int']
}

export type MutationChangeAdminRightsArgs = {
  id: Scalars['Int']
  status: Scalars['Boolean']
}

export type MutationChangePwArgs = {
  password: Scalars['String']
  token: Scalars['String']
}

export type MutationCreateChallengeArgs = {
  description: Scalars['String']
  lessonId: Scalars['Int']
  order: Scalars['Int']
  title: Scalars['String']
}

export type MutationCreateLessonArgs = {
  chatUrl?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  docUrl?: InputMaybe<Scalars['String']>
  githubUrl?: InputMaybe<Scalars['String']>
  order: Scalars['Int']
  slug: Scalars['String']
  title: Scalars['String']
  videoUrl?: InputMaybe<Scalars['String']>
}

export type MutationCreateSubmissionArgs = {
  challengeId: Scalars['Int']
  cliToken: Scalars['String']
  diff: Scalars['String']
  lessonId: Scalars['Int']
}

export type MutationDeleteCommentArgs = {
  id: Scalars['Int']
}

export type MutationDeleteExerciseArgs = {
  id: Scalars['Int']
}

export type MutationDeleteModuleArgs = {
  id: Scalars['Int']
}

export type MutationLoginArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationRejectSubmissionArgs = {
  comment: Scalars['String']
  id: Scalars['Int']
  lessonId: Scalars['Int']
}

export type MutationRemoveAlertArgs = {
  id: Scalars['Int']
}

export type MutationReqPwResetArgs = {
  userOrEmail: Scalars['String']
}

export type MutationSetStarArgs = {
  comment?: InputMaybe<Scalars['String']>
  lessonId: Scalars['Int']
  mentorId: Scalars['Int']
}

export type MutationSignupArgs = {
  email: Scalars['String']
  firstName: Scalars['String']
  lastName: Scalars['String']
  password?: InputMaybe<Scalars['String']>
  username: Scalars['String']
}

export type MutationUpdateChallengeArgs = {
  description: Scalars['String']
  id: Scalars['Int']
  lessonId: Scalars['Int']
  order: Scalars['Int']
  title: Scalars['String']
}

export type MutationUpdateExerciseArgs = {
  answer: Scalars['String']
  description: Scalars['String']
  explanation?: InputMaybe<Scalars['String']>
  flaggedAt?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  moduleId: Scalars['Int']
  testStr?: InputMaybe<Scalars['String']>
}

export type MutationUpdateLessonArgs = {
  chatUrl?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  docUrl?: InputMaybe<Scalars['String']>
  githubUrl?: InputMaybe<Scalars['String']>
  id: Scalars['Int']
  order: Scalars['Int']
  slug: Scalars['String']
  title: Scalars['String']
  videoUrl?: InputMaybe<Scalars['String']>
}

export type MutationUpdateModuleArgs = {
  content: Scalars['String']
  id: Scalars['Int']
  lessonId: Scalars['Int']
  name: Scalars['String']
  order: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  alerts: Array<Alert>
  allUsers?: Maybe<Array<Maybe<User>>>
  exercises: Array<Maybe<Exercise>>
  getLessonMentors?: Maybe<Array<Maybe<User>>>
  getPreviousSubmissions?: Maybe<Array<Submission>>
  isTokenValid: Scalars['Boolean']
  lessons: Array<Lesson>
  modules: Array<Maybe<Module>>
  session: Session
  submissions?: Maybe<Array<Submission>>
  userInfo?: Maybe<Session>
}

export type QueryGetLessonMentorsArgs = {
  lessonId: Scalars['Int']
}

export type QueryGetPreviousSubmissionsArgs = {
  challengeId: Scalars['Int']
  userId: Scalars['Int']
}

export type QueryIsTokenValidArgs = {
  cliToken: Scalars['String']
}

export type QuerySubmissionsArgs = {
  lessonId: Scalars['Int']
}

export type QueryUserInfoArgs = {
  username: Scalars['String']
}

export type Session = {
  __typename?: 'Session'
  lessonStatus: Array<UserLesson>
  submissions?: Maybe<Array<Submission>>
  user?: Maybe<User>
}

export type Star = {
  __typename?: 'Star'
  comment?: Maybe<Scalars['String']>
  id: Scalars['Int']
  lesson: Lesson
  lessonId: Scalars['Int']
  student: User
}

export type Submission = {
  __typename?: 'Submission'
  challenge: Challenge
  challengeId: Scalars['Int']
  comment?: Maybe<Scalars['String']>
  comments?: Maybe<Array<Comment>>
  createdAt?: Maybe<Scalars['String']>
  diff?: Maybe<Scalars['String']>
  id: Scalars['Int']
  lessonId: Scalars['Int']
  mrUrl?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  reviewer?: Maybe<User>
  reviewerId?: Maybe<Scalars['String']>
  status: SubmissionStatus
  updatedAt: Scalars['String']
  user: User
  userId?: Maybe<Scalars['String']>
  viewCount?: Maybe<Scalars['Int']>
}

export enum SubmissionStatus {
  NeedMoreWork = 'needMoreWork',
  Open = 'open',
  Overwritten = 'overwritten',
  Passed = 'passed'
}

export type SuccessResponse = {
  __typename?: 'SuccessResponse'
  success?: Maybe<Scalars['Boolean']>
}

export type TokenResponse = {
  __typename?: 'TokenResponse'
  success?: Maybe<Scalars['Boolean']>
  token?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  cliToken?: Maybe<Scalars['String']>
  discordAvatarUrl: Scalars['String']
  discordUserId: Scalars['String']
  discordUsername: Scalars['String']
  email: Scalars['String']
  id: Scalars['Int']
  isAdmin: Scalars['Boolean']
  isConnectedToDiscord: Scalars['Boolean']
  name: Scalars['String']
  userLesson?: Maybe<UserLesson>
  username: Scalars['String']
}

export type UserLesson = {
  __typename?: 'UserLesson'
  id: Scalars['Int']
  lessonId: Scalars['Int']
  passedAt?: Maybe<Scalars['String']>
  starGiven?: Maybe<Scalars['String']>
  starsReceived?: Maybe<Array<Maybe<Star>>>
  userId?: Maybe<Scalars['String']>
}

export type AcceptSubmissionMutationVariables = Exact<{
  submissionId: Scalars['Int']
  comment: Scalars['String']
  lessonId: Scalars['Int']
}>

export type AcceptSubmissionMutation = {
  __typename?: 'Mutation'
  acceptSubmission?: {
    __typename?: 'Submission'
    id: number
    comment?: string | null
    status: SubmissionStatus
  } | null
}

export type AddAlertMutationVariables = Exact<{
  text: Scalars['String']
  type: Scalars['String']
  url?: InputMaybe<Scalars['String']>
  urlCaption?: InputMaybe<Scalars['String']>
}>

export type AddAlertMutation = {
  __typename?: 'Mutation'
  addAlert?: Array<{
    __typename?: 'Alert'
    id: number
    text?: string | null
    type?: string | null
    url?: string | null
    urlCaption?: string | null
  } | null> | null
}

export type AddCommentMutationVariables = Exact<{
  line?: InputMaybe<Scalars['Int']>
  submissionId: Scalars['Int']
  content: Scalars['String']
  fileName?: InputMaybe<Scalars['String']>
}>

export type AddCommentMutation = {
  __typename?: 'Mutation'
  addComment?: { __typename?: 'Comment'; id: number } | null
}

export type AddModuleMutationVariables = Exact<{
  content: Scalars['String']
  lessonId: Scalars['Int']
  name: Scalars['String']
  order: Scalars['Int']
}>

export type AddModuleMutation = {
  __typename?: 'Mutation'
  addModule: {
    __typename?: 'Module'
    id: number
    name: string
    content: string
    order: number
    lesson: { __typename?: 'Lesson'; title: string }
  }
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = {
  __typename?: 'Query'
  allUsers?: Array<{
    __typename?: 'User'
    id: number
    username: string
    name: string
    isAdmin: boolean
    email: string
    cliToken?: string | null
  } | null> | null
}

export type ChangeAdminRightsMutationVariables = Exact<{
  id: Scalars['Int']
  status: Scalars['Boolean']
}>

export type ChangeAdminRightsMutation = {
  __typename?: 'Mutation'
  changeAdminRights?: {
    __typename?: 'SuccessResponse'
    success?: boolean | null
  } | null
}

export type CreateChallengeMutationVariables = Exact<{
  lessonId: Scalars['Int']
  order: Scalars['Int']
  description: Scalars['String']
  title: Scalars['String']
}>

export type CreateChallengeMutation = {
  __typename?: 'Mutation'
  createChallenge?: Array<{
    __typename?: 'Lesson'
    id: number
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    chatUrl?: string | null
    order: number
    description: string
    title: string
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      description: string
      lessonId: number
      title: string
      order: number
    }>
  } | null> | null
}

export type CreateLessonMutationVariables = Exact<{
  docUrl?: InputMaybe<Scalars['String']>
  githubUrl?: InputMaybe<Scalars['String']>
  videoUrl?: InputMaybe<Scalars['String']>
  chatUrl?: InputMaybe<Scalars['String']>
  order: Scalars['Int']
  slug: Scalars['String']
  description: Scalars['String']
  title: Scalars['String']
}>

export type CreateLessonMutation = {
  __typename?: 'Mutation'
  createLesson: Array<{
    __typename?: 'Lesson'
    slug: string
    id: number
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    chatUrl?: string | null
    order: number
    description: string
    title: string
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      description: string
      lessonId: number
      title: string
      order: number
    }>
  }>
}

export type CreateSubmissionMutationVariables = Exact<{
  lessonId: Scalars['Int']
  challengeId: Scalars['Int']
  cliToken: Scalars['String']
  diff: Scalars['String']
}>

export type CreateSubmissionMutation = {
  __typename?: 'Mutation'
  createSubmission?: {
    __typename?: 'Submission'
    id: number
    diff?: string | null
  } | null
}

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment?: { __typename?: 'Comment'; id: number } | null
}

export type DeleteModuleMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type DeleteModuleMutation = {
  __typename?: 'Mutation'
  deleteModule: {
    __typename?: 'Module'
    id: number
    order: number
    name: string
    content: string
    lesson: { __typename?: 'Lesson'; title: string }
  }
}

export type LessonAndChallengeInfoFragment = {
  __typename?: 'Lesson'
  id: number
  docUrl?: string | null
  githubUrl?: string | null
  videoUrl?: string | null
  chatUrl?: string | null
  order: number
  description: string
  title: string
  challenges: Array<{
    __typename?: 'Challenge'
    id: number
    description: string
    lessonId: number
    title: string
    order: number
  }>
}

export type SubmissionsInfoFragment = {
  __typename?: 'Submission'
  id: number
  status: SubmissionStatus
  diff?: string | null
  comment?: string | null
  challengeId: number
  lessonId: number
  createdAt?: string | null
  updatedAt: string
  challenge: { __typename?: 'Challenge'; title: string; description: string }
  user: { __typename?: 'User'; id: number; username: string }
  reviewer?: {
    __typename?: 'User'
    id: number
    username: string
    name: string
  } | null
  comments?: Array<{
    __typename?: 'Comment'
    id: number
    content: string
    submissionId: number
    createdAt: string
    authorId: number
    line?: number | null
    fileName?: string | null
    author?: { __typename?: 'User'; username: string; name: string } | null
  }> | null
}

export type GetAppQueryVariables = Exact<{ [key: string]: never }>

export type GetAppQuery = {
  __typename?: 'Query'
  lessons: Array<{
    __typename?: 'Lesson'
    id: number
    title: string
    description: string
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    order: number
    slug: string
    chatUrl?: string | null
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      title: string
      description: string
      order: number
    }>
  }>
  session: {
    __typename?: 'Session'
    user?: {
      __typename?: 'User'
      id: number
      username: string
      name: string
      isAdmin: boolean
      isConnectedToDiscord: boolean
    } | null
    submissions?: Array<{
      __typename?: 'Submission'
      id: number
      status: SubmissionStatus
      mrUrl?: string | null
      diff?: string | null
      viewCount?: number | null
      comment?: string | null
      order?: number | null
      challengeId: number
      lessonId: number
      createdAt?: string | null
      updatedAt: string
      reviewer?: { __typename?: 'User'; id: number; username: string } | null
      user: { __typename?: 'User'; id: number }
      comments?: Array<{
        __typename?: 'Comment'
        id: number
        content: string
        submissionId: number
        createdAt: string
        authorId: number
        line?: number | null
        fileName?: string | null
        author?: { __typename?: 'User'; username: string; name: string } | null
      }> | null
    }> | null
    lessonStatus: Array<{
      __typename?: 'UserLesson'
      lessonId: number
      passedAt?: string | null
      starGiven?: string | null
    }>
  }
  alerts: Array<{
    __typename?: 'Alert'
    id: number
    text?: string | null
    type?: string | null
    url?: string | null
    urlCaption?: string | null
  }>
}

export type LessonMentorsQueryVariables = Exact<{
  lessonId: Scalars['Int']
}>

export type LessonMentorsQuery = {
  __typename?: 'Query'
  getLessonMentors?: Array<{
    __typename?: 'User'
    username: string
    name: string
    id: number
  } | null> | null
}

export type GetLessonsQueryVariables = Exact<{ [key: string]: never }>

export type GetLessonsQuery = {
  __typename?: 'Query'
  lessons: Array<{
    __typename?: 'Lesson'
    slug: string
    id: number
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    chatUrl?: string | null
    order: number
    description: string
    title: string
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      description: string
      lessonId: number
      title: string
      order: number
    }>
  }>
}

export type GetPreviousSubmissionsQueryVariables = Exact<{
  challengeId: Scalars['Int']
  userId: Scalars['Int']
}>

export type GetPreviousSubmissionsQuery = {
  __typename?: 'Query'
  getPreviousSubmissions?: Array<{
    __typename?: 'Submission'
    id: number
    status: SubmissionStatus
    diff?: string | null
    comment?: string | null
    challengeId: number
    lessonId: number
    createdAt?: string | null
    updatedAt: string
    challenge: { __typename?: 'Challenge'; title: string; description: string }
    user: { __typename?: 'User'; id: number; username: string }
    reviewer?: {
      __typename?: 'User'
      id: number
      username: string
      name: string
    } | null
    comments?: Array<{
      __typename?: 'Comment'
      id: number
      content: string
      submissionId: number
      createdAt: string
      authorId: number
      line?: number | null
      fileName?: string | null
      author?: { __typename?: 'User'; username: string; name: string } | null
    }> | null
  }> | null
}

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>

export type GetSessionQuery = {
  __typename?: 'Query'
  session: {
    __typename?: 'Session'
    user?: {
      __typename?: 'User'
      id: number
      username: string
      name: string
      isAdmin: boolean
      isConnectedToDiscord: boolean
    } | null
    submissions?: Array<{
      __typename?: 'Submission'
      id: number
      status: SubmissionStatus
      mrUrl?: string | null
      diff?: string | null
      viewCount?: number | null
      comment?: string | null
      order?: number | null
      challengeId: number
      lessonId: number
      createdAt?: string | null
      updatedAt: string
      reviewer?: { __typename?: 'User'; id: number; username: string } | null
    }> | null
    lessonStatus: Array<{
      __typename?: 'UserLesson'
      lessonId: number
      passedAt?: string | null
      starGiven?: string | null
    }>
  }
}

export type SubmissionsQueryVariables = Exact<{
  lessonId: Scalars['Int']
}>

export type SubmissionsQuery = {
  __typename?: 'Query'
  submissions?: Array<{
    __typename?: 'Submission'
    id: number
    status: SubmissionStatus
    diff?: string | null
    comment?: string | null
    challengeId: number
    lessonId: number
    createdAt?: string | null
    updatedAt: string
    challenge: { __typename?: 'Challenge'; title: string; description: string }
    user: { __typename?: 'User'; id: number; username: string }
    reviewer?: {
      __typename?: 'User'
      id: number
      username: string
      name: string
    } | null
    comments?: Array<{
      __typename?: 'Comment'
      id: number
      content: string
      submissionId: number
      createdAt: string
      authorId: number
      line?: number | null
      fileName?: string | null
      author?: { __typename?: 'User'; username: string; name: string } | null
    }> | null
  }> | null
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'AuthResponse'
    success?: boolean | null
    username?: string | null
    cliToken?: string | null
    error?: string | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout?: {
    __typename?: 'AuthResponse'
    success?: boolean | null
    username?: string | null
    error?: string | null
  } | null
}

export type RejectSubmissionMutationVariables = Exact<{
  submissionId: Scalars['Int']
  comment: Scalars['String']
  lessonId: Scalars['Int']
}>

export type RejectSubmissionMutation = {
  __typename?: 'Mutation'
  rejectSubmission?: {
    __typename?: 'Submission'
    id: number
    comment?: string | null
    status: SubmissionStatus
  } | null
}

export type RemoveAlertMutationVariables = Exact<{
  id: Scalars['Int']
}>

export type RemoveAlertMutation = {
  __typename?: 'Mutation'
  removeAlert?: {
    __typename?: 'SuccessResponse'
    success?: boolean | null
  } | null
}

export type ReqPwResetMutationVariables = Exact<{
  userOrEmail: Scalars['String']
}>

export type ReqPwResetMutation = {
  __typename?: 'Mutation'
  reqPwReset: { __typename?: 'SuccessResponse'; success?: boolean | null }
}

export type SetStarMutationVariables = Exact<{
  mentorId: Scalars['Int']
  lessonId: Scalars['Int']
  comment?: InputMaybe<Scalars['String']>
}>

export type SetStarMutation = {
  __typename?: 'Mutation'
  setStar: { __typename?: 'SuccessResponse'; success?: boolean | null }
}

export type SignupMutationVariables = Exact<{
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signup?: {
    __typename?: 'AuthResponse'
    success?: boolean | null
    username?: string | null
    error?: string | null
    cliToken?: string | null
  } | null
}

export type UpdateChallengeMutationVariables = Exact<{
  lessonId: Scalars['Int']
  order: Scalars['Int']
  description: Scalars['String']
  title: Scalars['String']
  id: Scalars['Int']
}>

export type UpdateChallengeMutation = {
  __typename?: 'Mutation'
  updateChallenge?: Array<{
    __typename?: 'Lesson'
    id: number
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    chatUrl?: string | null
    order: number
    description: string
    title: string
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      description: string
      lessonId: number
      title: string
      order: number
    }>
  } | null> | null
}

export type UpdateLessonMutationVariables = Exact<{
  id: Scalars['Int']
  docUrl?: InputMaybe<Scalars['String']>
  githubUrl?: InputMaybe<Scalars['String']>
  videoUrl?: InputMaybe<Scalars['String']>
  chatUrl?: InputMaybe<Scalars['String']>
  order: Scalars['Int']
  slug: Scalars['String']
  description: Scalars['String']
  title: Scalars['String']
}>

export type UpdateLessonMutation = {
  __typename?: 'Mutation'
  updateLesson: Array<{
    __typename?: 'Lesson'
    slug: string
    id: number
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    chatUrl?: string | null
    order: number
    description: string
    title: string
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      description: string
      lessonId: number
      title: string
      order: number
    }>
  }>
}

export type UpdateModuleMutationVariables = Exact<{
  id: Scalars['Int']
  lessonId: Scalars['Int']
  name: Scalars['String']
  content: Scalars['String']
  order: Scalars['Int']
}>

export type UpdateModuleMutation = {
  __typename?: 'Mutation'
  updateModule: {
    __typename?: 'Module'
    id: number
    name: string
    content: string
    order: number
    lesson: { __typename?: 'Lesson'; title: string }
  }
}

export type ChangePwMutationVariables = Exact<{
  token: Scalars['String']
  password: Scalars['String']
}>

export type ChangePwMutation = {
  __typename?: 'Mutation'
  changePw?: { __typename?: 'AuthResponse'; success?: boolean | null } | null
}

export type UserInfoQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserInfoQuery = {
  __typename?: 'Query'
  lessons: Array<{
    __typename?: 'Lesson'
    id: number
    title: string
    description: string
    docUrl?: string | null
    githubUrl?: string | null
    videoUrl?: string | null
    order: number
    chatUrl?: string | null
    challenges: Array<{
      __typename?: 'Challenge'
      id: number
      title: string
      description: string
      order: number
    }>
  }>
  userInfo?: {
    __typename?: 'Session'
    user?: {
      __typename?: 'User'
      id: number
      username: string
      name: string
      discordUserId: string
      discordUsername: string
      discordAvatarUrl: string
    } | null
    submissions?: Array<{
      __typename?: 'Submission'
      id: number
      status: SubmissionStatus
      mrUrl?: string | null
      diff?: string | null
      viewCount?: number | null
      comment?: string | null
      order?: number | null
      challengeId: number
      lessonId: number
      createdAt?: string | null
      updatedAt: string
      reviewer?: { __typename?: 'User'; id: number; username: string } | null
    }> | null
    lessonStatus: Array<{
      __typename?: 'UserLesson'
      lessonId: number
      passedAt?: string | null
      starsReceived?: Array<{
        __typename?: 'Star'
        lessonId: number
        comment?: string | null
        student: { __typename?: 'User'; username: string; name: string }
        lesson: { __typename?: 'Lesson'; title: string; order: number }
      } | null> | null
    }>
  } | null
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Alert: ResolverTypeWrapper<Alert>
  AuthResponse: ResolverTypeWrapper<AuthResponse>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Challenge: ResolverTypeWrapper<Challenge>
  Comment: ResolverTypeWrapper<Comment>
  Exercise: ResolverTypeWrapper<Exercise>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Lesson: ResolverTypeWrapper<Lesson>
  Module: ResolverTypeWrapper<Module>
  Mutation: ResolverTypeWrapper<{}>
  Query: ResolverTypeWrapper<{}>
  Session: ResolverTypeWrapper<Session>
  Star: ResolverTypeWrapper<Star>
  String: ResolverTypeWrapper<Scalars['String']>
  Submission: ResolverTypeWrapper<Submission>
  SubmissionStatus: SubmissionStatus
  SuccessResponse: ResolverTypeWrapper<SuccessResponse>
  TokenResponse: ResolverTypeWrapper<TokenResponse>
  User: ResolverTypeWrapper<User>
  UserLesson: ResolverTypeWrapper<UserLesson>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Alert: Alert
  AuthResponse: AuthResponse
  Boolean: Scalars['Boolean']
  Challenge: Challenge
  Comment: Comment
  Exercise: Exercise
  Int: Scalars['Int']
  Lesson: Lesson
  Module: Module
  Mutation: {}
  Query: {}
  Session: Session
  Star: Star
  String: Scalars['String']
  Submission: Submission
  SuccessResponse: SuccessResponse
  TokenResponse: TokenResponse
  User: User
  UserLesson: UserLesson
}>

export type AlertResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  urlCaption?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type AuthResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']
> = ResolversObject<{
  cliToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ChallengeResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']
> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lessonId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type CommentResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']
> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  authorId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  fileName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  line?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  submission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType
  >
  submissionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ExerciseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Exercise'] = ResolversParentTypes['Exercise']
> = ResolversObject<{
  answer?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  explanation?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  module?: Resolver<ResolversTypes['Module'], ParentType, ContextType>
  testStr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type LessonResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Lesson'] = ResolversParentTypes['Lesson']
> = ResolversObject<{
  challenges?: Resolver<
    Array<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >
  chatUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  docUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  githubUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type ModuleResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Module'] = ResolversParentTypes['Module']
> = ResolversObject<{
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lesson?: Resolver<ResolversTypes['Lesson'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  acceptSubmission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType,
    RequireFields<MutationAcceptSubmissionArgs, 'comment' | 'id' | 'lessonId'>
  >
  addAlert?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Alert']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationAddAlertArgs, 'text' | 'type'>
  >
  addComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, 'content' | 'submissionId'>
  >
  addExercise?: Resolver<
    ResolversTypes['Exercise'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddExerciseArgs,
      'answer' | 'description' | 'moduleId'
    >
  >
  addModule?: Resolver<
    ResolversTypes['Module'],
    ParentType,
    ContextType,
    RequireFields<
      MutationAddModuleArgs,
      'content' | 'lessonId' | 'name' | 'order'
    >
  >
  changeAdminRights?: Resolver<
    Maybe<ResolversTypes['SuccessResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeAdminRightsArgs, 'id' | 'status'>
  >
  changePw?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePwArgs, 'password' | 'token'>
  >
  createChallenge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Lesson']>>>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateChallengeArgs,
      'description' | 'lessonId' | 'order' | 'title'
    >
  >
  createLesson?: Resolver<
    Array<ResolversTypes['Lesson']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateLessonArgs,
      'description' | 'order' | 'slug' | 'title'
    >
  >
  createSubmission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateSubmissionArgs,
      'challengeId' | 'cliToken' | 'diff' | 'lessonId'
    >
  >
  deleteComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, 'id'>
  >
  deleteExercise?: Resolver<
    ResolversTypes['Exercise'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteExerciseArgs, 'id'>
  >
  deleteModule?: Resolver<
    ResolversTypes['Module'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteModuleArgs, 'id'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'password' | 'username'>
  >
  logout?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType
  >
  rejectSubmission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType,
    RequireFields<MutationRejectSubmissionArgs, 'comment' | 'id' | 'lessonId'>
  >
  removeAlert?: Resolver<
    Maybe<ResolversTypes['SuccessResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAlertArgs, 'id'>
  >
  reqPwReset?: Resolver<
    ResolversTypes['SuccessResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationReqPwResetArgs, 'userOrEmail'>
  >
  setStar?: Resolver<
    ResolversTypes['SuccessResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSetStarArgs, 'lessonId' | 'mentorId'>
  >
  signup?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSignupArgs,
      'email' | 'firstName' | 'lastName' | 'username'
    >
  >
  updateChallenge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Lesson']>>>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateChallengeArgs,
      'description' | 'id' | 'lessonId' | 'order' | 'title'
    >
  >
  updateExercise?: Resolver<
    ResolversTypes['Exercise'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateExerciseArgs,
      'answer' | 'description' | 'id' | 'moduleId'
    >
  >
  updateLesson?: Resolver<
    Array<ResolversTypes['Lesson']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateLessonArgs,
      'description' | 'id' | 'order' | 'slug' | 'title'
    >
  >
  updateModule?: Resolver<
    ResolversTypes['Module'],
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateModuleArgs,
      'content' | 'id' | 'lessonId' | 'name' | 'order'
    >
  >
}>

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  alerts?: Resolver<Array<ResolversTypes['Alert']>, ParentType, ContextType>
  allUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >
  exercises?: Resolver<
    Array<Maybe<ResolversTypes['Exercise']>>,
    ParentType,
    ContextType
  >
  getLessonMentors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLessonMentorsArgs, 'lessonId'>
  >
  getPreviousSubmissions?: Resolver<
    Maybe<Array<ResolversTypes['Submission']>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPreviousSubmissionsArgs, 'challengeId' | 'userId'>
  >
  isTokenValid?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryIsTokenValidArgs, 'cliToken'>
  >
  lessons?: Resolver<Array<ResolversTypes['Lesson']>, ParentType, ContextType>
  modules?: Resolver<
    Array<Maybe<ResolversTypes['Module']>>,
    ParentType,
    ContextType
  >
  session?: Resolver<ResolversTypes['Session'], ParentType, ContextType>
  submissions?: Resolver<
    Maybe<Array<ResolversTypes['Submission']>>,
    ParentType,
    ContextType,
    RequireFields<QuerySubmissionsArgs, 'lessonId'>
  >
  userInfo?: Resolver<
    Maybe<ResolversTypes['Session']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserInfoArgs, 'username'>
  >
}>

export type SessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']
> = ResolversObject<{
  lessonStatus?: Resolver<
    Array<ResolversTypes['UserLesson']>,
    ParentType,
    ContextType
  >
  submissions?: Resolver<
    Maybe<Array<ResolversTypes['Submission']>>,
    ParentType,
    ContextType
  >
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type StarResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Star'] = ResolversParentTypes['Star']
> = ResolversObject<{
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lesson?: Resolver<ResolversTypes['Lesson'], ParentType, ContextType>
  lessonId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  student?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SubmissionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Submission'] = ResolversParentTypes['Submission']
> = ResolversObject<{
  challenge?: Resolver<ResolversTypes['Challenge'], ParentType, ContextType>
  challengeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  comments?: Resolver<
    Maybe<Array<ResolversTypes['Comment']>>,
    ParentType,
    ContextType
  >
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  diff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lessonId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  mrUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  reviewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  reviewerId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  status?: Resolver<ResolversTypes['SubmissionStatus'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  viewCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type SuccessResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SuccessResponse'] = ResolversParentTypes['SuccessResponse']
> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type TokenResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['TokenResponse'] = ResolversParentTypes['TokenResponse']
> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  cliToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  discordAvatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  discordUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  discordUsername?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  isConnectedToDiscord?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  userLesson?: Resolver<
    Maybe<ResolversTypes['UserLesson']>,
    ParentType,
    ContextType
  >
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type UserLessonResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['UserLesson'] = ResolversParentTypes['UserLesson']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  lessonId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  passedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  starGiven?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  starsReceived?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Star']>>>,
    ParentType,
    ContextType
  >
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}>

export type Resolvers<ContextType = Context> = ResolversObject<{
  Alert?: AlertResolvers<ContextType>
  AuthResponse?: AuthResponseResolvers<ContextType>
  Challenge?: ChallengeResolvers<ContextType>
  Comment?: CommentResolvers<ContextType>
  Exercise?: ExerciseResolvers<ContextType>
  Lesson?: LessonResolvers<ContextType>
  Module?: ModuleResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Session?: SessionResolvers<ContextType>
  Star?: StarResolvers<ContextType>
  Submission?: SubmissionResolvers<ContextType>
  SuccessResponse?: SuccessResponseResolvers<ContextType>
  TokenResponse?: TokenResponseResolvers<ContextType>
  User?: UserResolvers<ContextType>
  UserLesson?: UserLessonResolvers<ContextType>
}>

export const LessonAndChallengeInfoFragmentDoc = gql`
  fragment lessonAndChallengeInfo on Lesson {
    id
    docUrl
    githubUrl
    videoUrl
    chatUrl
    order
    description
    title
    challenges {
      id
      description
      lessonId
      title
      order
    }
  }
`
export const SubmissionsInfoFragmentDoc = gql`
  fragment submissionsInfo on Submission {
    id
    status
    diff
    comment
    challenge {
      title
      description
    }
    challengeId
    lessonId
    user {
      id
      username
    }
    reviewer {
      id
      username
      name
    }
    comments {
      id
      content
      submissionId
      createdAt
      authorId
      line
      fileName
      author {
        username
        name
      }
    }
    createdAt
    updatedAt
  }
`
export const AcceptSubmissionDocument = gql`
  mutation acceptSubmission(
    $submissionId: Int!
    $comment: String!
    $lessonId: Int!
  ) {
    acceptSubmission(
      id: $submissionId
      comment: $comment
      lessonId: $lessonId
    ) {
      id
      comment
      status
    }
  }
`
export type AcceptSubmissionMutationFn = Apollo.MutationFunction<
  AcceptSubmissionMutation,
  AcceptSubmissionMutationVariables
>
export type AcceptSubmissionProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >
} & TChildProps
export function withAcceptSubmission<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables,
    AcceptSubmissionProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables,
    AcceptSubmissionProps<TChildProps, TDataName>
  >(AcceptSubmissionDocument, {
    alias: 'acceptSubmission',
    ...operationOptions
  })
}

/**
 * __useAcceptSubmissionMutation__
 *
 * To run a mutation, you first call `useAcceptSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptSubmissionMutation, { data, loading, error }] = useAcceptSubmissionMutation({
 *   variables: {
 *      submissionId: // value for 'submissionId'
 *      comment: // value for 'comment'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useAcceptSubmissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >(AcceptSubmissionDocument, options)
}
export type AcceptSubmissionMutationHookResult = ReturnType<
  typeof useAcceptSubmissionMutation
>
export type AcceptSubmissionMutationResult =
  Apollo.MutationResult<AcceptSubmissionMutation>
export type AcceptSubmissionMutationOptions = Apollo.BaseMutationOptions<
  AcceptSubmissionMutation,
  AcceptSubmissionMutationVariables
>
export const AddAlertDocument = gql`
  mutation addAlert(
    $text: String!
    $type: String!
    $url: String
    $urlCaption: String
  ) {
    addAlert(text: $text, type: $type, url: $url, urlCaption: $urlCaption) {
      id
      text
      type
      url
      urlCaption
    }
  }
`
export type AddAlertMutationFn = Apollo.MutationFunction<
  AddAlertMutation,
  AddAlertMutationVariables
>
export type AddAlertProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    AddAlertMutation,
    AddAlertMutationVariables
  >
} & TChildProps
export function withAddAlert<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddAlertMutation,
    AddAlertMutationVariables,
    AddAlertProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddAlertMutation,
    AddAlertMutationVariables,
    AddAlertProps<TChildProps, TDataName>
  >(AddAlertDocument, {
    alias: 'addAlert',
    ...operationOptions
  })
}

/**
 * __useAddAlertMutation__
 *
 * To run a mutation, you first call `useAddAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAlertMutation, { data, loading, error }] = useAddAlertMutation({
 *   variables: {
 *      text: // value for 'text'
 *      type: // value for 'type'
 *      url: // value for 'url'
 *      urlCaption: // value for 'urlCaption'
 *   },
 * });
 */
export function useAddAlertMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddAlertMutation,
    AddAlertMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddAlertMutation, AddAlertMutationVariables>(
    AddAlertDocument,
    options
  )
}
export type AddAlertMutationHookResult = ReturnType<typeof useAddAlertMutation>
export type AddAlertMutationResult = Apollo.MutationResult<AddAlertMutation>
export type AddAlertMutationOptions = Apollo.BaseMutationOptions<
  AddAlertMutation,
  AddAlertMutationVariables
>
export const AddCommentDocument = gql`
  mutation addComment(
    $line: Int
    $submissionId: Int!
    $content: String!
    $fileName: String
  ) {
    addComment(
      line: $line
      submissionId: $submissionId
      content: $content
      fileName: $fileName
    ) {
      id
    }
  }
`
export type AddCommentMutationFn = Apollo.MutationFunction<
  AddCommentMutation,
  AddCommentMutationVariables
>
export type AddCommentProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    AddCommentMutation,
    AddCommentMutationVariables
  >
} & TChildProps
export function withAddComment<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddCommentMutation,
    AddCommentMutationVariables,
    AddCommentProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddCommentMutation,
    AddCommentMutationVariables,
    AddCommentProps<TChildProps, TDataName>
  >(AddCommentDocument, {
    alias: 'addComment',
    ...operationOptions
  })
}

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      line: // value for 'line'
 *      submissionId: // value for 'submissionId'
 *      content: // value for 'content'
 *      fileName: // value for 'fileName'
 *   },
 * });
 */
export function useAddCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCommentMutation,
    AddCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(
    AddCommentDocument,
    options
  )
}
export type AddCommentMutationHookResult = ReturnType<
  typeof useAddCommentMutation
>
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<
  AddCommentMutation,
  AddCommentMutationVariables
>
export const AddModuleDocument = gql`
  mutation addModule(
    $content: String!
    $lessonId: Int!
    $name: String!
    $order: Int!
  ) {
    addModule(
      content: $content
      lessonId: $lessonId
      name: $name
      order: $order
    ) {
      id
      name
      content
      order
      lesson {
        title
      }
    }
  }
`
export type AddModuleMutationFn = Apollo.MutationFunction<
  AddModuleMutation,
  AddModuleMutationVariables
>
export type AddModuleProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    AddModuleMutation,
    AddModuleMutationVariables
  >
} & TChildProps
export function withAddModule<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AddModuleMutation,
    AddModuleMutationVariables,
    AddModuleProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AddModuleMutation,
    AddModuleMutationVariables,
    AddModuleProps<TChildProps, TDataName>
  >(AddModuleDocument, {
    alias: 'addModule',
    ...operationOptions
  })
}

/**
 * __useAddModuleMutation__
 *
 * To run a mutation, you first call `useAddModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addModuleMutation, { data, loading, error }] = useAddModuleMutation({
 *   variables: {
 *      content: // value for 'content'
 *      lessonId: // value for 'lessonId'
 *      name: // value for 'name'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useAddModuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddModuleMutation,
    AddModuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddModuleMutation, AddModuleMutationVariables>(
    AddModuleDocument,
    options
  )
}
export type AddModuleMutationHookResult = ReturnType<
  typeof useAddModuleMutation
>
export type AddModuleMutationResult = Apollo.MutationResult<AddModuleMutation>
export type AddModuleMutationOptions = Apollo.BaseMutationOptions<
  AddModuleMutation,
  AddModuleMutationVariables
>
export const UsersDocument = gql`
  query users {
    allUsers {
      id
      username
      name
      isAdmin
      email
      cliToken
    }
  }
`
export type UsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<UsersQuery, UsersQueryVariables>
} & TChildProps
export function withUsers<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps, TDataName>
  >(UsersDocument, {
    alias: 'users',
    ...operationOptions
  })
}

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  )
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
export const ChangeAdminRightsDocument = gql`
  mutation changeAdminRights($id: Int!, $status: Boolean!) {
    changeAdminRights(id: $id, status: $status) {
      success
    }
  }
`
export type ChangeAdminRightsMutationFn = Apollo.MutationFunction<
  ChangeAdminRightsMutation,
  ChangeAdminRightsMutationVariables
>
export type ChangeAdminRightsProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >
} & TChildProps
export function withChangeAdminRights<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables,
    ChangeAdminRightsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables,
    ChangeAdminRightsProps<TChildProps, TDataName>
  >(ChangeAdminRightsDocument, {
    alias: 'changeAdminRights',
    ...operationOptions
  })
}

/**
 * __useChangeAdminRightsMutation__
 *
 * To run a mutation, you first call `useChangeAdminRightsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAdminRightsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAdminRightsMutation, { data, loading, error }] = useChangeAdminRightsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeAdminRightsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >(ChangeAdminRightsDocument, options)
}
export type ChangeAdminRightsMutationHookResult = ReturnType<
  typeof useChangeAdminRightsMutation
>
export type ChangeAdminRightsMutationResult =
  Apollo.MutationResult<ChangeAdminRightsMutation>
export type ChangeAdminRightsMutationOptions = Apollo.BaseMutationOptions<
  ChangeAdminRightsMutation,
  ChangeAdminRightsMutationVariables
>
export const CreateChallengeDocument = gql`
  mutation createChallenge(
    $lessonId: Int!
    $order: Int!
    $description: String!
    $title: String!
  ) {
    createChallenge(
      lessonId: $lessonId
      order: $order
      description: $description
      title: $title
    ) {
      ...lessonAndChallengeInfo
    }
  }
  ${LessonAndChallengeInfoFragmentDoc}
`
export type CreateChallengeMutationFn = Apollo.MutationFunction<
  CreateChallengeMutation,
  CreateChallengeMutationVariables
>
export type CreateChallengeProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >
} & TChildProps
export function withCreateChallenge<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateChallengeMutation,
    CreateChallengeMutationVariables,
    CreateChallengeProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateChallengeMutation,
    CreateChallengeMutationVariables,
    CreateChallengeProps<TChildProps, TDataName>
  >(CreateChallengeDocument, {
    alias: 'createChallenge',
    ...operationOptions
  })
}

/**
 * __useCreateChallengeMutation__
 *
 * To run a mutation, you first call `useCreateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChallengeMutation, { data, loading, error }] = useCreateChallengeMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      order: // value for 'order'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >(CreateChallengeDocument, options)
}
export type CreateChallengeMutationHookResult = ReturnType<
  typeof useCreateChallengeMutation
>
export type CreateChallengeMutationResult =
  Apollo.MutationResult<CreateChallengeMutation>
export type CreateChallengeMutationOptions = Apollo.BaseMutationOptions<
  CreateChallengeMutation,
  CreateChallengeMutationVariables
>
export const CreateLessonDocument = gql`
  mutation createLesson(
    $docUrl: String
    $githubUrl: String
    $videoUrl: String
    $chatUrl: String
    $order: Int!
    $slug: String!
    $description: String!
    $title: String!
  ) {
    createLesson(
      docUrl: $docUrl
      githubUrl: $githubUrl
      videoUrl: $videoUrl
      chatUrl: $chatUrl
      order: $order
      slug: $slug
      description: $description
      title: $title
    ) {
      ...lessonAndChallengeInfo
      slug
    }
  }
  ${LessonAndChallengeInfoFragmentDoc}
`
export type CreateLessonMutationFn = Apollo.MutationFunction<
  CreateLessonMutation,
  CreateLessonMutationVariables
>
export type CreateLessonProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >
} & TChildProps
export function withCreateLesson<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateLessonMutation,
    CreateLessonMutationVariables,
    CreateLessonProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateLessonMutation,
    CreateLessonMutationVariables,
    CreateLessonProps<TChildProps, TDataName>
  >(CreateLessonDocument, {
    alias: 'createLesson',
    ...operationOptions
  })
}

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      docUrl: // value for 'docUrl'
 *      githubUrl: // value for 'githubUrl'
 *      videoUrl: // value for 'videoUrl'
 *      chatUrl: // value for 'chatUrl'
 *      order: // value for 'order'
 *      slug: // value for 'slug'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateLessonMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >(CreateLessonDocument, options)
}
export type CreateLessonMutationHookResult = ReturnType<
  typeof useCreateLessonMutation
>
export type CreateLessonMutationResult =
  Apollo.MutationResult<CreateLessonMutation>
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<
  CreateLessonMutation,
  CreateLessonMutationVariables
>
export const CreateSubmissionDocument = gql`
  mutation createSubmission(
    $lessonId: Int!
    $challengeId: Int!
    $cliToken: String!
    $diff: String!
  ) {
    createSubmission(
      lessonId: $lessonId
      challengeId: $challengeId
      cliToken: $cliToken
      diff: $diff
    ) {
      id
      diff
    }
  }
`
export type CreateSubmissionMutationFn = Apollo.MutationFunction<
  CreateSubmissionMutation,
  CreateSubmissionMutationVariables
>
export type CreateSubmissionProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables
  >
} & TChildProps
export function withCreateSubmission<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables,
    CreateSubmissionProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables,
    CreateSubmissionProps<TChildProps, TDataName>
  >(CreateSubmissionDocument, {
    alias: 'createSubmission',
    ...operationOptions
  })
}

/**
 * __useCreateSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubmissionMutation, { data, loading, error }] = useCreateSubmissionMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      challengeId: // value for 'challengeId'
 *      cliToken: // value for 'cliToken'
 *      diff: // value for 'diff'
 *   },
 * });
 */
export function useCreateSubmissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateSubmissionMutation,
    CreateSubmissionMutationVariables
  >(CreateSubmissionDocument, options)
}
export type CreateSubmissionMutationHookResult = ReturnType<
  typeof useCreateSubmissionMutation
>
export type CreateSubmissionMutationResult =
  Apollo.MutationResult<CreateSubmissionMutation>
export type CreateSubmissionMutationOptions = Apollo.BaseMutationOptions<
  CreateSubmissionMutation,
  CreateSubmissionMutationVariables
>
export const DeleteCommentDocument = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export type DeleteCommentProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
} & TChildProps
export function withDeleteComment<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteCommentMutation,
    DeleteCommentMutationVariables,
    DeleteCommentProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteCommentMutation,
    DeleteCommentMutationVariables,
    DeleteCommentProps<TChildProps, TDataName>
  >(DeleteCommentDocument, {
    alias: 'deleteComment',
    ...operationOptions
  })
}

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options)
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>
export type DeleteCommentMutationResult =
  Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export const DeleteModuleDocument = gql`
  mutation deleteModule($id: Int!) {
    deleteModule(id: $id) {
      id
      lesson {
        title
      }
      order
      name
      content
    }
  }
`
export type DeleteModuleMutationFn = Apollo.MutationFunction<
  DeleteModuleMutation,
  DeleteModuleMutationVariables
>
export type DeleteModuleProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    DeleteModuleMutation,
    DeleteModuleMutationVariables
  >
} & TChildProps
export function withDeleteModule<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteModuleMutation,
    DeleteModuleMutationVariables,
    DeleteModuleProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteModuleMutation,
    DeleteModuleMutationVariables,
    DeleteModuleProps<TChildProps, TDataName>
  >(DeleteModuleDocument, {
    alias: 'deleteModule',
    ...operationOptions
  })
}

/**
 * __useDeleteModuleMutation__
 *
 * To run a mutation, you first call `useDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModuleMutation, { data, loading, error }] = useDeleteModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteModuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteModuleMutation,
    DeleteModuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteModuleMutation,
    DeleteModuleMutationVariables
  >(DeleteModuleDocument, options)
}
export type DeleteModuleMutationHookResult = ReturnType<
  typeof useDeleteModuleMutation
>
export type DeleteModuleMutationResult =
  Apollo.MutationResult<DeleteModuleMutation>
export type DeleteModuleMutationOptions = Apollo.BaseMutationOptions<
  DeleteModuleMutation,
  DeleteModuleMutationVariables
>
export const GetAppDocument = gql`
  query getApp {
    lessons {
      id
      title
      description
      docUrl
      githubUrl
      videoUrl
      order
      slug
      challenges {
        id
        title
        description
        order
      }
      chatUrl
    }
    session {
      user {
        id
        username
        name
        isAdmin
        isConnectedToDiscord
      }
      submissions {
        id
        status
        mrUrl
        diff
        viewCount
        comment
        order
        challengeId
        lessonId
        reviewer {
          id
          username
        }
        user {
          id
        }
        createdAt
        updatedAt
        comments {
          id
          content
          submissionId
          createdAt
          authorId
          line
          fileName
          author {
            username
            name
          }
        }
      }
      lessonStatus {
        lessonId
        passedAt
        starGiven
      }
    }
    alerts {
      id
      text
      type
      url
      urlCaption
    }
  }
`
export type GetAppProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetAppQuery,
    GetAppQueryVariables
  >
} & TChildProps
export function withGetApp<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAppQuery,
    GetAppQueryVariables,
    GetAppProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAppQuery,
    GetAppQueryVariables,
    GetAppProps<TChildProps, TDataName>
  >(GetAppDocument, {
    alias: 'getApp',
    ...operationOptions
  })
}

/**
 * __useGetAppQuery__
 *
 * To run a query within a React component, call `useGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAppQuery, GetAppQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppDocument,
    options
  )
}
export function useGetAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAppQuery, GetAppQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppDocument,
    options
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = Apollo.QueryResult<
  GetAppQuery,
  GetAppQueryVariables
>
export const LessonMentorsDocument = gql`
  query lessonMentors($lessonId: Int!) {
    getLessonMentors(lessonId: $lessonId) {
      username
      name
      id
    }
  }
`
export type LessonMentorsProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >
} & TChildProps
export function withLessonMentors<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LessonMentorsQuery,
    LessonMentorsQueryVariables,
    LessonMentorsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    LessonMentorsQuery,
    LessonMentorsQueryVariables,
    LessonMentorsProps<TChildProps, TDataName>
  >(LessonMentorsDocument, {
    alias: 'lessonMentors',
    ...operationOptions
  })
}

/**
 * __useLessonMentorsQuery__
 *
 * To run a query within a React component, call `useLessonMentorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonMentorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonMentorsQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useLessonMentorsQuery(
  baseOptions: Apollo.QueryHookOptions<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LessonMentorsQuery, LessonMentorsQueryVariables>(
    LessonMentorsDocument,
    options
  )
}
export function useLessonMentorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<LessonMentorsQuery, LessonMentorsQueryVariables>(
    LessonMentorsDocument,
    options
  )
}
export type LessonMentorsQueryHookResult = ReturnType<
  typeof useLessonMentorsQuery
>
export type LessonMentorsLazyQueryHookResult = ReturnType<
  typeof useLessonMentorsLazyQuery
>
export type LessonMentorsQueryResult = Apollo.QueryResult<
  LessonMentorsQuery,
  LessonMentorsQueryVariables
>
export const GetLessonsDocument = gql`
  query getLessons {
    lessons {
      ...lessonAndChallengeInfo
      slug
    }
  }
  ${LessonAndChallengeInfoFragmentDoc}
`
export type GetLessonsProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetLessonsQuery,
    GetLessonsQueryVariables
  >
} & TChildProps
export function withGetLessons<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetLessonsQuery,
    GetLessonsQueryVariables,
    GetLessonsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetLessonsQuery,
    GetLessonsQueryVariables,
    GetLessonsProps<TChildProps, TDataName>
  >(GetLessonsDocument, {
    alias: 'getLessons',
    ...operationOptions
  })
}

/**
 * __useGetLessonsQuery__
 *
 * To run a query within a React component, call `useGetLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLessonsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLessonsQuery,
    GetLessonsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLessonsQuery, GetLessonsQueryVariables>(
    GetLessonsDocument,
    options
  )
}
export function useGetLessonsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLessonsQuery,
    GetLessonsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLessonsQuery, GetLessonsQueryVariables>(
    GetLessonsDocument,
    options
  )
}
export type GetLessonsQueryHookResult = ReturnType<typeof useGetLessonsQuery>
export type GetLessonsLazyQueryHookResult = ReturnType<
  typeof useGetLessonsLazyQuery
>
export type GetLessonsQueryResult = Apollo.QueryResult<
  GetLessonsQuery,
  GetLessonsQueryVariables
>
export const GetPreviousSubmissionsDocument = gql`
  query getPreviousSubmissions($challengeId: Int!, $userId: Int!) {
    getPreviousSubmissions(challengeId: $challengeId, userId: $userId) {
      ...submissionsInfo
    }
  }
  ${SubmissionsInfoFragmentDoc}
`
export type GetPreviousSubmissionsProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables
  >
} & TChildProps
export function withGetPreviousSubmissions<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables,
    GetPreviousSubmissionsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables,
    GetPreviousSubmissionsProps<TChildProps, TDataName>
  >(GetPreviousSubmissionsDocument, {
    alias: 'getPreviousSubmissions',
    ...operationOptions
  })
}

/**
 * __useGetPreviousSubmissionsQuery__
 *
 * To run a query within a React component, call `useGetPreviousSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreviousSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreviousSubmissionsQuery({
 *   variables: {
 *      challengeId: // value for 'challengeId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetPreviousSubmissionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables
  >(GetPreviousSubmissionsDocument, options)
}
export function useGetPreviousSubmissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetPreviousSubmissionsQuery,
    GetPreviousSubmissionsQueryVariables
  >(GetPreviousSubmissionsDocument, options)
}
export type GetPreviousSubmissionsQueryHookResult = ReturnType<
  typeof useGetPreviousSubmissionsQuery
>
export type GetPreviousSubmissionsLazyQueryHookResult = ReturnType<
  typeof useGetPreviousSubmissionsLazyQuery
>
export type GetPreviousSubmissionsQueryResult = Apollo.QueryResult<
  GetPreviousSubmissionsQuery,
  GetPreviousSubmissionsQueryVariables
>
export const GetSessionDocument = gql`
  query getSession {
    session {
      user {
        id
        username
        name
        isAdmin
        isConnectedToDiscord
      }
      submissions {
        id
        status
        mrUrl
        diff
        viewCount
        comment
        order
        challengeId
        lessonId
        reviewer {
          id
          username
        }
        createdAt
        updatedAt
      }
      lessonStatus {
        lessonId
        passedAt
        starGiven
      }
    }
  }
`
export type GetSessionProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetSessionQuery,
    GetSessionQueryVariables
  >
} & TChildProps
export function withGetSession<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetSessionQuery,
    GetSessionQueryVariables,
    GetSessionProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetSessionQuery,
    GetSessionQueryVariables,
    GetSessionProps<TChildProps, TDataName>
  >(GetSessionDocument, {
    alias: 'getSession',
    ...operationOptions
  })
}

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options
  )
}
export function useGetSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options
  )
}
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>
export type GetSessionLazyQueryHookResult = ReturnType<
  typeof useGetSessionLazyQuery
>
export type GetSessionQueryResult = Apollo.QueryResult<
  GetSessionQuery,
  GetSessionQueryVariables
>
export const SubmissionsDocument = gql`
  query submissions($lessonId: Int!) {
    submissions(lessonId: $lessonId) {
      ...submissionsInfo
    }
  }
  ${SubmissionsInfoFragmentDoc}
`
export type SubmissionsProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >
} & TChildProps
export function withSubmissions<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SubmissionsQuery,
    SubmissionsQueryVariables,
    SubmissionsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    SubmissionsQuery,
    SubmissionsQueryVariables,
    SubmissionsProps<TChildProps, TDataName>
  >(SubmissionsDocument, {
    alias: 'submissions',
    ...operationOptions
  })
}

/**
 * __useSubmissionsQuery__
 *
 * To run a query within a React component, call `useSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubmissionsQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useSubmissionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SubmissionsQuery, SubmissionsQueryVariables>(
    SubmissionsDocument,
    options
  )
}
export function useSubmissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SubmissionsQuery, SubmissionsQueryVariables>(
    SubmissionsDocument,
    options
  )
}
export type SubmissionsQueryHookResult = ReturnType<typeof useSubmissionsQuery>
export type SubmissionsLazyQueryHookResult = ReturnType<
  typeof useSubmissionsLazyQuery
>
export type SubmissionsQueryResult = Apollo.QueryResult<
  SubmissionsQuery,
  SubmissionsQueryVariables
>
export const LoginDocument = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      username
      cliToken
      error
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>
export type LoginProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
  >
} & TChildProps
export function withLogin<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps, TDataName>
  >(LoginDocument, {
    alias: 'login',
    ...operationOptions
  })
}

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const LogoutDocument = gql`
  mutation logout {
    logout {
      success
      username
      error
    }
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>
export type LogoutProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
  >
} & TChildProps
export function withLogout<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps, TDataName>
  >(LogoutDocument, {
    alias: 'logout',
    ...operationOptions
  })
}

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const RejectSubmissionDocument = gql`
  mutation rejectSubmission(
    $submissionId: Int!
    $comment: String!
    $lessonId: Int!
  ) {
    rejectSubmission(
      id: $submissionId
      comment: $comment
      lessonId: $lessonId
    ) {
      id
      comment
      status
    }
  }
`
export type RejectSubmissionMutationFn = Apollo.MutationFunction<
  RejectSubmissionMutation,
  RejectSubmissionMutationVariables
>
export type RejectSubmissionProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >
} & TChildProps
export function withRejectSubmission<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables,
    RejectSubmissionProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables,
    RejectSubmissionProps<TChildProps, TDataName>
  >(RejectSubmissionDocument, {
    alias: 'rejectSubmission',
    ...operationOptions
  })
}

/**
 * __useRejectSubmissionMutation__
 *
 * To run a mutation, you first call `useRejectSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectSubmissionMutation, { data, loading, error }] = useRejectSubmissionMutation({
 *   variables: {
 *      submissionId: // value for 'submissionId'
 *      comment: // value for 'comment'
 *      lessonId: // value for 'lessonId'
 *   },
 * });
 */
export function useRejectSubmissionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >(RejectSubmissionDocument, options)
}
export type RejectSubmissionMutationHookResult = ReturnType<
  typeof useRejectSubmissionMutation
>
export type RejectSubmissionMutationResult =
  Apollo.MutationResult<RejectSubmissionMutation>
export type RejectSubmissionMutationOptions = Apollo.BaseMutationOptions<
  RejectSubmissionMutation,
  RejectSubmissionMutationVariables
>
export const RemoveAlertDocument = gql`
  mutation removeAlert($id: Int!) {
    removeAlert(id: $id) {
      success
    }
  }
`
export type RemoveAlertMutationFn = Apollo.MutationFunction<
  RemoveAlertMutation,
  RemoveAlertMutationVariables
>
export type RemoveAlertProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >
} & TChildProps
export function withRemoveAlert<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RemoveAlertMutation,
    RemoveAlertMutationVariables,
    RemoveAlertProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RemoveAlertMutation,
    RemoveAlertMutationVariables,
    RemoveAlertProps<TChildProps, TDataName>
  >(RemoveAlertDocument, {
    alias: 'removeAlert',
    ...operationOptions
  })
}

/**
 * __useRemoveAlertMutation__
 *
 * To run a mutation, you first call `useRemoveAlertMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAlertMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAlertMutation, { data, loading, error }] = useRemoveAlertMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAlertMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveAlertMutation, RemoveAlertMutationVariables>(
    RemoveAlertDocument,
    options
  )
}
export type RemoveAlertMutationHookResult = ReturnType<
  typeof useRemoveAlertMutation
>
export type RemoveAlertMutationResult =
  Apollo.MutationResult<RemoveAlertMutation>
export type RemoveAlertMutationOptions = Apollo.BaseMutationOptions<
  RemoveAlertMutation,
  RemoveAlertMutationVariables
>
export const ReqPwResetDocument = gql`
  mutation reqPwReset($userOrEmail: String!) {
    reqPwReset(userOrEmail: $userOrEmail) {
      success
    }
  }
`
export type ReqPwResetMutationFn = Apollo.MutationFunction<
  ReqPwResetMutation,
  ReqPwResetMutationVariables
>
export type ReqPwResetProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >
} & TChildProps
export function withReqPwReset<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ReqPwResetMutation,
    ReqPwResetMutationVariables,
    ReqPwResetProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ReqPwResetMutation,
    ReqPwResetMutationVariables,
    ReqPwResetProps<TChildProps, TDataName>
  >(ReqPwResetDocument, {
    alias: 'reqPwReset',
    ...operationOptions
  })
}

/**
 * __useReqPwResetMutation__
 *
 * To run a mutation, you first call `useReqPwResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReqPwResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reqPwResetMutation, { data, loading, error }] = useReqPwResetMutation({
 *   variables: {
 *      userOrEmail: // value for 'userOrEmail'
 *   },
 * });
 */
export function useReqPwResetMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ReqPwResetMutation, ReqPwResetMutationVariables>(
    ReqPwResetDocument,
    options
  )
}
export type ReqPwResetMutationHookResult = ReturnType<
  typeof useReqPwResetMutation
>
export type ReqPwResetMutationResult = Apollo.MutationResult<ReqPwResetMutation>
export type ReqPwResetMutationOptions = Apollo.BaseMutationOptions<
  ReqPwResetMutation,
  ReqPwResetMutationVariables
>
export const SetStarDocument = gql`
  mutation setStar($mentorId: Int!, $lessonId: Int!, $comment: String) {
    setStar(mentorId: $mentorId, lessonId: $lessonId, comment: $comment) {
      success
    }
  }
`
export type SetStarMutationFn = Apollo.MutationFunction<
  SetStarMutation,
  SetStarMutationVariables
>
export type SetStarProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    SetStarMutation,
    SetStarMutationVariables
  >
} & TChildProps
export function withSetStar<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SetStarMutation,
    SetStarMutationVariables,
    SetStarProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SetStarMutation,
    SetStarMutationVariables,
    SetStarProps<TChildProps, TDataName>
  >(SetStarDocument, {
    alias: 'setStar',
    ...operationOptions
  })
}

/**
 * __useSetStarMutation__
 *
 * To run a mutation, you first call `useSetStarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetStarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setStarMutation, { data, loading, error }] = useSetStarMutation({
 *   variables: {
 *      mentorId: // value for 'mentorId'
 *      lessonId: // value for 'lessonId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useSetStarMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetStarMutation,
    SetStarMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SetStarMutation, SetStarMutationVariables>(
    SetStarDocument,
    options
  )
}
export type SetStarMutationHookResult = ReturnType<typeof useSetStarMutation>
export type SetStarMutationResult = Apollo.MutationResult<SetStarMutation>
export type SetStarMutationOptions = Apollo.BaseMutationOptions<
  SetStarMutation,
  SetStarMutationVariables
>
export const SignupDocument = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
    ) {
      success
      username
      error
      cliToken
    }
  }
`
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>
export type SignupProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    SignupMutation,
    SignupMutationVariables
  >
} & TChildProps
export function withSignup<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignupMutation,
    SignupMutationVariables,
    SignupProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignupMutation,
    SignupMutationVariables,
    SignupProps<TChildProps, TDataName>
  >(SignupDocument, {
    alias: 'signup',
    ...operationOptions
  })
}

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  )
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>
export const UpdateChallengeDocument = gql`
  mutation updateChallenge(
    $lessonId: Int!
    $order: Int!
    $description: String!
    $title: String!
    $id: Int!
  ) {
    updateChallenge(
      id: $id
      lessonId: $lessonId
      order: $order
      description: $description
      title: $title
    ) {
      ...lessonAndChallengeInfo
    }
  }
  ${LessonAndChallengeInfoFragmentDoc}
`
export type UpdateChallengeMutationFn = Apollo.MutationFunction<
  UpdateChallengeMutation,
  UpdateChallengeMutationVariables
>
export type UpdateChallengeProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
} & TChildProps
export function withUpdateChallenge<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables,
    UpdateChallengeProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables,
    UpdateChallengeProps<TChildProps, TDataName>
  >(UpdateChallengeDocument, {
    alias: 'updateChallenge',
    ...operationOptions
  })
}

/**
 * __useUpdateChallengeMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeMutation, { data, loading, error }] = useUpdateChallengeMutation({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      order: // value for 'order'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >(UpdateChallengeDocument, options)
}
export type UpdateChallengeMutationHookResult = ReturnType<
  typeof useUpdateChallengeMutation
>
export type UpdateChallengeMutationResult =
  Apollo.MutationResult<UpdateChallengeMutation>
export type UpdateChallengeMutationOptions = Apollo.BaseMutationOptions<
  UpdateChallengeMutation,
  UpdateChallengeMutationVariables
>
export const UpdateLessonDocument = gql`
  mutation updateLesson(
    $id: Int!
    $docUrl: String
    $githubUrl: String
    $videoUrl: String
    $chatUrl: String
    $order: Int!
    $slug: String!
    $description: String!
    $title: String!
  ) {
    updateLesson(
      docUrl: $docUrl
      githubUrl: $githubUrl
      videoUrl: $videoUrl
      chatUrl: $chatUrl
      id: $id
      order: $order
      slug: $slug
      description: $description
      title: $title
    ) {
      ...lessonAndChallengeInfo
      slug
    }
  }
  ${LessonAndChallengeInfoFragmentDoc}
`
export type UpdateLessonMutationFn = Apollo.MutationFunction<
  UpdateLessonMutation,
  UpdateLessonMutationVariables
>
export type UpdateLessonProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >
} & TChildProps
export function withUpdateLesson<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateLessonMutation,
    UpdateLessonMutationVariables,
    UpdateLessonProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateLessonMutation,
    UpdateLessonMutationVariables,
    UpdateLessonProps<TChildProps, TDataName>
  >(UpdateLessonDocument, {
    alias: 'updateLesson',
    ...operationOptions
  })
}

/**
 * __useUpdateLessonMutation__
 *
 * To run a mutation, you first call `useUpdateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLessonMutation, { data, loading, error }] = useUpdateLessonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      docUrl: // value for 'docUrl'
 *      githubUrl: // value for 'githubUrl'
 *      videoUrl: // value for 'videoUrl'
 *      chatUrl: // value for 'chatUrl'
 *      order: // value for 'order'
 *      slug: // value for 'slug'
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateLessonMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >(UpdateLessonDocument, options)
}
export type UpdateLessonMutationHookResult = ReturnType<
  typeof useUpdateLessonMutation
>
export type UpdateLessonMutationResult =
  Apollo.MutationResult<UpdateLessonMutation>
export type UpdateLessonMutationOptions = Apollo.BaseMutationOptions<
  UpdateLessonMutation,
  UpdateLessonMutationVariables
>
export const UpdateModuleDocument = gql`
  mutation updateModule(
    $id: Int!
    $lessonId: Int!
    $name: String!
    $content: String!
    $order: Int!
  ) {
    updateModule(
      id: $id
      lessonId: $lessonId
      name: $name
      content: $content
      order: $order
    ) {
      id
      name
      content
      order
      lesson {
        title
      }
    }
  }
`
export type UpdateModuleMutationFn = Apollo.MutationFunction<
  UpdateModuleMutation,
  UpdateModuleMutationVariables
>
export type UpdateModuleProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    UpdateModuleMutation,
    UpdateModuleMutationVariables
  >
} & TChildProps
export function withUpdateModule<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateModuleMutation,
    UpdateModuleMutationVariables,
    UpdateModuleProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateModuleMutation,
    UpdateModuleMutationVariables,
    UpdateModuleProps<TChildProps, TDataName>
  >(UpdateModuleDocument, {
    alias: 'updateModule',
    ...operationOptions
  })
}

/**
 * __useUpdateModuleMutation__
 *
 * To run a mutation, you first call `useUpdateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModuleMutation, { data, loading, error }] = useUpdateModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      lessonId: // value for 'lessonId'
 *      name: // value for 'name'
 *      content: // value for 'content'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useUpdateModuleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateModuleMutation,
    UpdateModuleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateModuleMutation,
    UpdateModuleMutationVariables
  >(UpdateModuleDocument, options)
}
export type UpdateModuleMutationHookResult = ReturnType<
  typeof useUpdateModuleMutation
>
export type UpdateModuleMutationResult =
  Apollo.MutationResult<UpdateModuleMutation>
export type UpdateModuleMutationOptions = Apollo.BaseMutationOptions<
  UpdateModuleMutation,
  UpdateModuleMutationVariables
>
export const ChangePwDocument = gql`
  mutation changePw($token: String!, $password: String!) {
    changePw(token: $token, password: $password) {
      success
    }
  }
`
export type ChangePwMutationFn = Apollo.MutationFunction<
  ChangePwMutation,
  ChangePwMutationVariables
>
export type ChangePwProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    ChangePwMutation,
    ChangePwMutationVariables
  >
} & TChildProps
export function withChangePw<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ChangePwMutation,
    ChangePwMutationVariables,
    ChangePwProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    ChangePwMutation,
    ChangePwMutationVariables,
    ChangePwProps<TChildProps, TDataName>
  >(ChangePwDocument, {
    alias: 'changePw',
    ...operationOptions
  })
}

/**
 * __useChangePwMutation__
 *
 * To run a mutation, you first call `useChangePwMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePwMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePwMutation, { data, loading, error }] = useChangePwMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePwMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePwMutation,
    ChangePwMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ChangePwMutation, ChangePwMutationVariables>(
    ChangePwDocument,
    options
  )
}
export type ChangePwMutationHookResult = ReturnType<typeof useChangePwMutation>
export type ChangePwMutationResult = Apollo.MutationResult<ChangePwMutation>
export type ChangePwMutationOptions = Apollo.BaseMutationOptions<
  ChangePwMutation,
  ChangePwMutationVariables
>
export const UserInfoDocument = gql`
  query userInfo($username: String!) {
    lessons {
      id
      title
      description
      docUrl
      githubUrl
      videoUrl
      order
      challenges {
        id
        title
        description
        order
      }
      chatUrl
    }
    userInfo(username: $username) {
      user {
        id
        username
        name
        discordUserId
        discordUsername
        discordAvatarUrl
      }
      submissions {
        id
        status
        mrUrl
        diff
        viewCount
        comment
        order
        challengeId
        lessonId
        reviewer {
          id
          username
        }
        createdAt
        updatedAt
      }
      lessonStatus {
        lessonId
        passedAt
        starsReceived {
          lessonId
          comment
          student {
            username
            name
          }
          lesson {
            title
            order
          }
        }
      }
    }
  }
`
export type UserInfoProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    UserInfoQuery,
    UserInfoQueryVariables
  >
} & TChildProps
export function withUserInfo<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserInfoQuery,
    UserInfoQueryVariables,
    UserInfoProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UserInfoQuery,
    UserInfoQueryVariables,
    UserInfoProps<TChildProps, TDataName>
  >(UserInfoDocument, {
    alias: 'userInfo',
    ...operationOptions
  })
}

/**
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserInfoQuery(
  baseOptions: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    options
  )
}
export function useUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserInfoQuery,
    UserInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    options
  )
}
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>
export type UserInfoLazyQueryHookResult = ReturnType<
  typeof useUserInfoLazyQuery
>
export type UserInfoQueryResult = Apollo.QueryResult<
  UserInfoQuery,
  UserInfoQueryVariables
>
export type AlertKeySpecifier = (
  | 'id'
  | 'text'
  | 'type'
  | 'url'
  | 'urlCaption'
  | AlertKeySpecifier
)[]
export type AlertFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  text?: FieldPolicy<any> | FieldReadFunction<any>
  type?: FieldPolicy<any> | FieldReadFunction<any>
  url?: FieldPolicy<any> | FieldReadFunction<any>
  urlCaption?: FieldPolicy<any> | FieldReadFunction<any>
}
export type AuthResponseKeySpecifier = (
  | 'cliToken'
  | 'error'
  | 'success'
  | 'username'
  | AuthResponseKeySpecifier
)[]
export type AuthResponseFieldPolicy = {
  cliToken?: FieldPolicy<any> | FieldReadFunction<any>
  error?: FieldPolicy<any> | FieldReadFunction<any>
  success?: FieldPolicy<any> | FieldReadFunction<any>
  username?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ChallengeKeySpecifier = (
  | 'description'
  | 'id'
  | 'lessonId'
  | 'order'
  | 'title'
  | ChallengeKeySpecifier
)[]
export type ChallengeFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  lessonId?: FieldPolicy<any> | FieldReadFunction<any>
  order?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
}
export type CommentKeySpecifier = (
  | 'author'
  | 'authorId'
  | 'content'
  | 'createdAt'
  | 'fileName'
  | 'id'
  | 'line'
  | 'submission'
  | 'submissionId'
  | CommentKeySpecifier
)[]
export type CommentFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>
  authorId?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>
  fileName?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  line?: FieldPolicy<any> | FieldReadFunction<any>
  submission?: FieldPolicy<any> | FieldReadFunction<any>
  submissionId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ExerciseKeySpecifier = (
  | 'answer'
  | 'author'
  | 'description'
  | 'explanation'
  | 'id'
  | 'module'
  | 'testStr'
  | ExerciseKeySpecifier
)[]
export type ExerciseFieldPolicy = {
  answer?: FieldPolicy<any> | FieldReadFunction<any>
  author?: FieldPolicy<any> | FieldReadFunction<any>
  description?: FieldPolicy<any> | FieldReadFunction<any>
  explanation?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  module?: FieldPolicy<any> | FieldReadFunction<any>
  testStr?: FieldPolicy<any> | FieldReadFunction<any>
}
export type LessonKeySpecifier = (
  | 'challenges'
  | 'chatUrl'
  | 'currentUser'
  | 'description'
  | 'docUrl'
  | 'githubUrl'
  | 'id'
  | 'order'
  | 'slug'
  | 'title'
  | 'users'
  | 'videoUrl'
  | LessonKeySpecifier
)[]
export type LessonFieldPolicy = {
  challenges?: FieldPolicy<any> | FieldReadFunction<any>
  chatUrl?: FieldPolicy<any> | FieldReadFunction<any>
  currentUser?: FieldPolicy<any> | FieldReadFunction<any>
  description?: FieldPolicy<any> | FieldReadFunction<any>
  docUrl?: FieldPolicy<any> | FieldReadFunction<any>
  githubUrl?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  order?: FieldPolicy<any> | FieldReadFunction<any>
  slug?: FieldPolicy<any> | FieldReadFunction<any>
  title?: FieldPolicy<any> | FieldReadFunction<any>
  users?: FieldPolicy<any> | FieldReadFunction<any>
  videoUrl?: FieldPolicy<any> | FieldReadFunction<any>
}
export type ModuleKeySpecifier = (
  | 'author'
  | 'content'
  | 'id'
  | 'lesson'
  | 'name'
  | 'order'
  | ModuleKeySpecifier
)[]
export type ModuleFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>
  content?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  lesson?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  order?: FieldPolicy<any> | FieldReadFunction<any>
}
export type MutationKeySpecifier = (
  | 'acceptSubmission'
  | 'addAlert'
  | 'addComment'
  | 'addExercise'
  | 'addModule'
  | 'changeAdminRights'
  | 'changePw'
  | 'createChallenge'
  | 'createLesson'
  | 'createSubmission'
  | 'deleteComment'
  | 'deleteExercise'
  | 'deleteModule'
  | 'login'
  | 'logout'
  | 'rejectSubmission'
  | 'removeAlert'
  | 'reqPwReset'
  | 'setStar'
  | 'signup'
  | 'updateChallenge'
  | 'updateExercise'
  | 'updateLesson'
  | 'updateModule'
  | MutationKeySpecifier
)[]
export type MutationFieldPolicy = {
  acceptSubmission?: FieldPolicy<any> | FieldReadFunction<any>
  addAlert?: FieldPolicy<any> | FieldReadFunction<any>
  addComment?: FieldPolicy<any> | FieldReadFunction<any>
  addExercise?: FieldPolicy<any> | FieldReadFunction<any>
  addModule?: FieldPolicy<any> | FieldReadFunction<any>
  changeAdminRights?: FieldPolicy<any> | FieldReadFunction<any>
  changePw?: FieldPolicy<any> | FieldReadFunction<any>
  createChallenge?: FieldPolicy<any> | FieldReadFunction<any>
  createLesson?: FieldPolicy<any> | FieldReadFunction<any>
  createSubmission?: FieldPolicy<any> | FieldReadFunction<any>
  deleteComment?: FieldPolicy<any> | FieldReadFunction<any>
  deleteExercise?: FieldPolicy<any> | FieldReadFunction<any>
  deleteModule?: FieldPolicy<any> | FieldReadFunction<any>
  login?: FieldPolicy<any> | FieldReadFunction<any>
  logout?: FieldPolicy<any> | FieldReadFunction<any>
  rejectSubmission?: FieldPolicy<any> | FieldReadFunction<any>
  removeAlert?: FieldPolicy<any> | FieldReadFunction<any>
  reqPwReset?: FieldPolicy<any> | FieldReadFunction<any>
  setStar?: FieldPolicy<any> | FieldReadFunction<any>
  signup?: FieldPolicy<any> | FieldReadFunction<any>
  updateChallenge?: FieldPolicy<any> | FieldReadFunction<any>
  updateExercise?: FieldPolicy<any> | FieldReadFunction<any>
  updateLesson?: FieldPolicy<any> | FieldReadFunction<any>
  updateModule?: FieldPolicy<any> | FieldReadFunction<any>
}
export type QueryKeySpecifier = (
  | 'alerts'
  | 'allUsers'
  | 'exercises'
  | 'getLessonMentors'
  | 'getPreviousSubmissions'
  | 'isTokenValid'
  | 'lessons'
  | 'modules'
  | 'session'
  | 'submissions'
  | 'userInfo'
  | QueryKeySpecifier
)[]
export type QueryFieldPolicy = {
  alerts?: FieldPolicy<any> | FieldReadFunction<any>
  allUsers?: FieldPolicy<any> | FieldReadFunction<any>
  exercises?: FieldPolicy<any> | FieldReadFunction<any>
  getLessonMentors?: FieldPolicy<any> | FieldReadFunction<any>
  getPreviousSubmissions?: FieldPolicy<any> | FieldReadFunction<any>
  isTokenValid?: FieldPolicy<any> | FieldReadFunction<any>
  lessons?: FieldPolicy<any> | FieldReadFunction<any>
  modules?: FieldPolicy<any> | FieldReadFunction<any>
  session?: FieldPolicy<any> | FieldReadFunction<any>
  submissions?: FieldPolicy<any> | FieldReadFunction<any>
  userInfo?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SessionKeySpecifier = (
  | 'lessonStatus'
  | 'submissions'
  | 'user'
  | SessionKeySpecifier
)[]
export type SessionFieldPolicy = {
  lessonStatus?: FieldPolicy<any> | FieldReadFunction<any>
  submissions?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StarKeySpecifier = (
  | 'comment'
  | 'id'
  | 'lesson'
  | 'lessonId'
  | 'student'
  | StarKeySpecifier
)[]
export type StarFieldPolicy = {
  comment?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  lesson?: FieldPolicy<any> | FieldReadFunction<any>
  lessonId?: FieldPolicy<any> | FieldReadFunction<any>
  student?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SubmissionKeySpecifier = (
  | 'challenge'
  | 'challengeId'
  | 'comment'
  | 'comments'
  | 'createdAt'
  | 'diff'
  | 'id'
  | 'lessonId'
  | 'mrUrl'
  | 'order'
  | 'reviewer'
  | 'reviewerId'
  | 'status'
  | 'updatedAt'
  | 'user'
  | 'userId'
  | 'viewCount'
  | SubmissionKeySpecifier
)[]
export type SubmissionFieldPolicy = {
  challenge?: FieldPolicy<any> | FieldReadFunction<any>
  challengeId?: FieldPolicy<any> | FieldReadFunction<any>
  comment?: FieldPolicy<any> | FieldReadFunction<any>
  comments?: FieldPolicy<any> | FieldReadFunction<any>
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>
  diff?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  lessonId?: FieldPolicy<any> | FieldReadFunction<any>
  mrUrl?: FieldPolicy<any> | FieldReadFunction<any>
  order?: FieldPolicy<any> | FieldReadFunction<any>
  reviewer?: FieldPolicy<any> | FieldReadFunction<any>
  reviewerId?: FieldPolicy<any> | FieldReadFunction<any>
  status?: FieldPolicy<any> | FieldReadFunction<any>
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
  user?: FieldPolicy<any> | FieldReadFunction<any>
  userId?: FieldPolicy<any> | FieldReadFunction<any>
  viewCount?: FieldPolicy<any> | FieldReadFunction<any>
}
export type SuccessResponseKeySpecifier = (
  | 'success'
  | SuccessResponseKeySpecifier
)[]
export type SuccessResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>
}
export type TokenResponseKeySpecifier = (
  | 'success'
  | 'token'
  | TokenResponseKeySpecifier
)[]
export type TokenResponseFieldPolicy = {
  success?: FieldPolicy<any> | FieldReadFunction<any>
  token?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserKeySpecifier = (
  | 'cliToken'
  | 'discordAvatarUrl'
  | 'discordUserId'
  | 'discordUsername'
  | 'email'
  | 'id'
  | 'isAdmin'
  | 'isConnectedToDiscord'
  | 'name'
  | 'userLesson'
  | 'username'
  | UserKeySpecifier
)[]
export type UserFieldPolicy = {
  cliToken?: FieldPolicy<any> | FieldReadFunction<any>
  discordAvatarUrl?: FieldPolicy<any> | FieldReadFunction<any>
  discordUserId?: FieldPolicy<any> | FieldReadFunction<any>
  discordUsername?: FieldPolicy<any> | FieldReadFunction<any>
  email?: FieldPolicy<any> | FieldReadFunction<any>
  id?: FieldPolicy<any> | FieldReadFunction<any>
  isAdmin?: FieldPolicy<any> | FieldReadFunction<any>
  isConnectedToDiscord?: FieldPolicy<any> | FieldReadFunction<any>
  name?: FieldPolicy<any> | FieldReadFunction<any>
  userLesson?: FieldPolicy<any> | FieldReadFunction<any>
  username?: FieldPolicy<any> | FieldReadFunction<any>
}
export type UserLessonKeySpecifier = (
  | 'id'
  | 'lessonId'
  | 'passedAt'
  | 'starGiven'
  | 'starsReceived'
  | 'userId'
  | UserLessonKeySpecifier
)[]
export type UserLessonFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>
  lessonId?: FieldPolicy<any> | FieldReadFunction<any>
  passedAt?: FieldPolicy<any> | FieldReadFunction<any>
  starGiven?: FieldPolicy<any> | FieldReadFunction<any>
  starsReceived?: FieldPolicy<any> | FieldReadFunction<any>
  userId?: FieldPolicy<any> | FieldReadFunction<any>
}
export type StrictTypedTypePolicies = {
  Alert?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AlertKeySpecifier
      | (() => undefined | AlertKeySpecifier)
    fields?: AlertFieldPolicy
  }
  AuthResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuthResponseKeySpecifier
      | (() => undefined | AuthResponseKeySpecifier)
    fields?: AuthResponseFieldPolicy
  }
  Challenge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ChallengeKeySpecifier
      | (() => undefined | ChallengeKeySpecifier)
    fields?: ChallengeFieldPolicy
  }
  Comment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CommentKeySpecifier
      | (() => undefined | CommentKeySpecifier)
    fields?: CommentFieldPolicy
  }
  Exercise?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ExerciseKeySpecifier
      | (() => undefined | ExerciseKeySpecifier)
    fields?: ExerciseFieldPolicy
  }
  Lesson?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LessonKeySpecifier
      | (() => undefined | LessonKeySpecifier)
    fields?: LessonFieldPolicy
  }
  Module?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ModuleKeySpecifier
      | (() => undefined | ModuleKeySpecifier)
    fields?: ModuleFieldPolicy
  }
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier)
    fields?: MutationFieldPolicy
  }
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier)
    fields?: QueryFieldPolicy
  }
  Session?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SessionKeySpecifier
      | (() => undefined | SessionKeySpecifier)
    fields?: SessionFieldPolicy
  }
  Star?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | StarKeySpecifier | (() => undefined | StarKeySpecifier)
    fields?: StarFieldPolicy
  }
  Submission?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SubmissionKeySpecifier
      | (() => undefined | SubmissionKeySpecifier)
    fields?: SubmissionFieldPolicy
  }
  SuccessResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SuccessResponseKeySpecifier
      | (() => undefined | SuccessResponseKeySpecifier)
    fields?: SuccessResponseFieldPolicy
  }
  TokenResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TokenResponseKeySpecifier
      | (() => undefined | TokenResponseKeySpecifier)
    fields?: TokenResponseFieldPolicy
  }
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier)
    fields?: UserFieldPolicy
  }
  UserLesson?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserLessonKeySpecifier
      | (() => undefined | UserLessonKeySpecifier)
    fields?: UserLessonFieldPolicy
  }
}
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies
