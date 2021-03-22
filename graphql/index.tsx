import * as ApolloReactHooks from '@apollo/client'
import { gql } from '@apollo/client'
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from 'graphql'
import * as ApolloReactCommon from '@apollo/client'
import * as React from 'react'
import * as ApolloReactComponents from '@apollo/client/react/components'
import * as ApolloReactHoc from '@apollo/client/react/hoc'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Alert = {
  __typename?: 'Alert'
  id: Scalars['String']
  text?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  urlCaption?: Maybe<Scalars['String']>
}

export type AuthResponse = {
  __typename?: 'AuthResponse'
  success?: Maybe<Scalars['Boolean']>
  username?: Maybe<Scalars['String']>
  error?: Maybe<Scalars['String']>
  cliToken?: Maybe<Scalars['String']>
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Challenge = {
  __typename?: 'Challenge'
  id?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  lessonId?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
}

export type Lesson = {
  __typename?: 'Lesson'
  id?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  docUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  title?: Maybe<Scalars['String']>
  challenges?: Maybe<Array<Maybe<Challenge>>>
  users?: Maybe<Array<Maybe<User>>>
  currentUser?: Maybe<User>
  chatUrl?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  setStar: SuccessResponse
  login?: Maybe<AuthResponse>
  logout?: Maybe<AuthResponse>
  reqPwReset?: Maybe<TokenResponse>
  changePw?: Maybe<AuthResponse>
  changeAdminRights?: Maybe<SuccessResponse>
  signup?: Maybe<AuthResponse>
  addAlert?: Maybe<Array<Maybe<Alert>>>
  removeAlert?: Maybe<SuccessResponse>
  createSubmission?: Maybe<Submission>
  acceptSubmission?: Maybe<Submission>
  rejectSubmission?: Maybe<Submission>
  createLesson?: Maybe<Array<Maybe<Lesson>>>
  updateLesson?: Maybe<Array<Maybe<Lesson>>>
  createChallenge?: Maybe<Array<Maybe<Lesson>>>
  updateChallenge?: Maybe<Array<Maybe<Lesson>>>
}

export type MutationSetStarArgs = {
  mentorId: Scalars['Int']
  lessonId: Scalars['Int']
  comment?: Maybe<Scalars['String']>
}

export type MutationLoginArgs = {
  username: Scalars['String']
  password: Scalars['String']
}

export type MutationReqPwResetArgs = {
  userOrEmail: Scalars['String']
}

export type MutationChangePwArgs = {
  token: Scalars['String']
  password: Scalars['String']
}

export type MutationChangeAdminRightsArgs = {
  id: Scalars['Int']
  status: Scalars['String']
}

export type MutationSignupArgs = {
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
  password?: Maybe<Scalars['String']>
}

export type MutationAddAlertArgs = {
  text: Scalars['String']
  type: Scalars['String']
  url?: Maybe<Scalars['String']>
  urlCaption?: Maybe<Scalars['String']>
}

export type MutationRemoveAlertArgs = {
  id: Scalars['String']
}

export type MutationCreateSubmissionArgs = {
  lessonId: Scalars['String']
  challengeId: Scalars['String']
  cliToken: Scalars['String']
  diff: Scalars['String']
}

export type MutationAcceptSubmissionArgs = {
  id: Scalars['String']
  comment: Scalars['String']
}

export type MutationRejectSubmissionArgs = {
  id: Scalars['String']
  comment: Scalars['String']
}

export type MutationCreateLessonArgs = {
  description: Scalars['String']
  docUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  title: Scalars['String']
  chatUrl?: Maybe<Scalars['String']>
  order: Scalars['Int']
}

export type MutationUpdateLessonArgs = {
  id: Scalars['Int']
  description?: Maybe<Scalars['String']>
  docUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  chatUrl?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
}

export type MutationCreateChallengeArgs = {
  lessonId: Scalars['Int']
  order: Scalars['Int']
  description: Scalars['String']
  title: Scalars['String']
}

export type MutationUpdateChallengeArgs = {
  lessonId: Scalars['Int']
  id: Scalars['Int']
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  lessons: Array<Lesson>
  session?: Maybe<Session>
  allUsers?: Maybe<Array<Maybe<User>>>
  getLessonMentors?: Maybe<Array<Maybe<User>>>
  userInfo?: Maybe<Session>
  isTokenValid: Scalars['Boolean']
  submissions?: Maybe<Array<Maybe<Submission>>>
  alerts: Array<Alert>
}

export type QueryGetLessonMentorsArgs = {
  lessonId: Scalars['String']
}

export type QueryUserInfoArgs = {
  username: Scalars['String']
}

export type QueryIsTokenValidArgs = {
  cliToken: Scalars['String']
}

export type QuerySubmissionsArgs = {
  lessonId: Scalars['String']
}

export type Session = {
  __typename?: 'Session'
  user?: Maybe<User>
  submissions?: Maybe<Array<Maybe<Submission>>>
  lessonStatus: Array<UserLesson>
}

export type Star = {
  __typename?: 'Star'
  id: Scalars['String']
  studentId?: Maybe<Scalars['Int']>
  mentorId?: Maybe<Scalars['Int']>
  lessonId?: Maybe<Scalars['Int']>
  comment?: Maybe<Scalars['String']>
}

export type Submission = {
  __typename?: 'Submission'
  id?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  mrUrl?: Maybe<Scalars['String']>
  diff?: Maybe<Scalars['String']>
  viewCount?: Maybe<Scalars['Int']>
  comment?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  lessonId?: Maybe<Scalars['String']>
  challengeId?: Maybe<Scalars['String']>
  challenge?: Maybe<Challenge>
  reviewer?: Maybe<User>
  user?: Maybe<User>
  reviewerId?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
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
  id?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  userLesson?: Maybe<UserLesson>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  isAdmin?: Maybe<Scalars['String']>
  cliToken?: Maybe<Scalars['String']>
}

export type UserLesson = {
  __typename?: 'UserLesson'
  id?: Maybe<Scalars['String']>
  userId?: Maybe<Scalars['String']>
  lessonId?: Maybe<Scalars['String']>
  isPassed?: Maybe<Scalars['String']>
  isTeaching?: Maybe<Scalars['String']>
  isEnrolled?: Maybe<Scalars['String']>
  starsReceived?: Maybe<Array<Maybe<Star>>>
  starGiven?: Maybe<Scalars['String']>
}

export type AcceptSubmissionMutationVariables = Exact<{
  submissionId: Scalars['String']
  comment: Scalars['String']
}>

export type AcceptSubmissionMutation = { __typename?: 'Mutation' } & {
  acceptSubmission?: Maybe<
    { __typename?: 'Submission' } & Pick<
      Submission,
      'id' | 'comment' | 'status'
    >
  >
}

export type AddAlertMutationVariables = Exact<{
  text: Scalars['String']
  type: Scalars['String']
  url?: Maybe<Scalars['String']>
  urlCaption?: Maybe<Scalars['String']>
}>

export type AddAlertMutation = { __typename?: 'Mutation' } & {
  addAlert?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Alert' } & Pick<
          Alert,
          'id' | 'text' | 'type' | 'url' | 'urlCaption'
        >
      >
    >
  >
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = { __typename?: 'Query' } & {
  allUsers?: Maybe<
    Array<
      Maybe<
        { __typename?: 'User' } & Pick<
          User,
          'id' | 'username' | 'name' | 'isAdmin' | 'email' | 'cliToken'
        >
      >
    >
  >
}

export type ChangeAdminRightsMutationVariables = Exact<{
  id: Scalars['Int']
  status: Scalars['String']
}>

export type ChangeAdminRightsMutation = { __typename?: 'Mutation' } & {
  changeAdminRights?: Maybe<
    { __typename?: 'SuccessResponse' } & Pick<SuccessResponse, 'success'>
  >
}

export type CreateChallengeMutationVariables = Exact<{
  lessonId: Scalars['Int']
  order: Scalars['Int']
  description: Scalars['String']
  title: Scalars['String']
}>

export type CreateChallengeMutation = { __typename?: 'Mutation' } & {
  createChallenge?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Lesson' } & Pick<
          Lesson,
          | 'id'
          | 'docUrl'
          | 'githubUrl'
          | 'videoUrl'
          | 'chatUrl'
          | 'order'
          | 'description'
          | 'title'
        > & {
            challenges?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'Challenge' } & Pick<
                    Challenge,
                    'id' | 'description' | 'lessonId' | 'title' | 'order'
                  >
                >
              >
            >
          }
      >
    >
  >
}

export type CreateLessonMutationVariables = Exact<{
  docUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  chatUrl?: Maybe<Scalars['String']>
  order: Scalars['Int']
  description: Scalars['String']
  title: Scalars['String']
}>

export type CreateLessonMutation = { __typename?: 'Mutation' } & {
  createLesson?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Lesson' } & Pick<
          Lesson,
          | 'id'
          | 'docUrl'
          | 'githubUrl'
          | 'videoUrl'
          | 'chatUrl'
          | 'order'
          | 'description'
          | 'title'
        > & {
            challenges?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'Challenge' } & Pick<
                    Challenge,
                    'id' | 'description' | 'lessonId' | 'title' | 'order'
                  >
                >
              >
            >
          }
      >
    >
  >
}

export type GetAppQueryVariables = Exact<{ [key: string]: never }>

export type GetAppQuery = { __typename?: 'Query' } & {
  lessons: Array<
    { __typename?: 'Lesson' } & Pick<
      Lesson,
      | 'id'
      | 'title'
      | 'description'
      | 'docUrl'
      | 'githubUrl'
      | 'videoUrl'
      | 'order'
      | 'chatUrl'
    > & {
        challenges?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Challenge' } & Pick<
                Challenge,
                'id' | 'title' | 'description' | 'order'
              >
            >
          >
        >
      }
  >
  session?: Maybe<
    { __typename?: 'Session' } & {
      user?: Maybe<
        { __typename?: 'User' } & Pick<
          User,
          'id' | 'username' | 'name' | 'isAdmin'
        >
      >
      submissions?: Maybe<
        Array<
          Maybe<
            { __typename?: 'Submission' } & Pick<
              Submission,
              | 'id'
              | 'status'
              | 'mrUrl'
              | 'diff'
              | 'viewCount'
              | 'comment'
              | 'order'
              | 'challengeId'
              | 'lessonId'
              | 'createdAt'
              | 'updatedAt'
            > & {
                reviewer?: Maybe<
                  { __typename?: 'User' } & Pick<User, 'id' | 'username'>
                >
              }
          >
        >
      >
      lessonStatus: Array<
        { __typename?: 'UserLesson' } & Pick<
          UserLesson,
          'lessonId' | 'isPassed' | 'isTeaching' | 'isEnrolled' | 'starGiven'
        >
      >
    }
  >
  alerts: Array<
    { __typename?: 'Alert' } & Pick<
      Alert,
      'id' | 'text' | 'type' | 'url' | 'urlCaption'
    >
  >
}

export type LessonMentorsQueryVariables = Exact<{
  lessonId: Scalars['String']
}>

export type LessonMentorsQuery = { __typename?: 'Query' } & {
  getLessonMentors?: Maybe<
    Array<
      Maybe<{ __typename?: 'User' } & Pick<User, 'username' | 'name' | 'id'>>
    >
  >
}

export type SubmissionsQueryVariables = Exact<{
  lessonId: Scalars['String']
}>

export type SubmissionsQuery = { __typename?: 'Query' } & {
  submissions?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Submission' } & Pick<
          Submission,
          | 'id'
          | 'status'
          | 'diff'
          | 'comment'
          | 'challengeId'
          | 'lessonId'
          | 'createdAt'
          | 'updatedAt'
        > & {
            challenge?: Maybe<
              { __typename?: 'Challenge' } & Pick<Challenge, 'title'>
            >
            user?: Maybe<
              { __typename?: 'User' } & Pick<User, 'id' | 'username'>
            >
          }
      >
    >
  >
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<
    { __typename?: 'AuthResponse' } & Pick<
      AuthResponse,
      'success' | 'username' | 'cliToken' | 'error'
    >
  >
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation' } & {
  logout?: Maybe<
    { __typename?: 'AuthResponse' } & Pick<
      AuthResponse,
      'success' | 'username' | 'error'
    >
  >
}

export type RejectSubmissionMutationVariables = Exact<{
  submissionId: Scalars['String']
  comment: Scalars['String']
}>

export type RejectSubmissionMutation = { __typename?: 'Mutation' } & {
  rejectSubmission?: Maybe<
    { __typename?: 'Submission' } & Pick<
      Submission,
      'id' | 'comment' | 'status'
    >
  >
}

export type RemoveAlertMutationVariables = Exact<{
  id: Scalars['String']
}>

export type RemoveAlertMutation = { __typename?: 'Mutation' } & {
  removeAlert?: Maybe<
    { __typename?: 'SuccessResponse' } & Pick<SuccessResponse, 'success'>
  >
}

export type ReqPwResetMutationVariables = Exact<{
  userOrEmail: Scalars['String']
}>

export type ReqPwResetMutation = { __typename?: 'Mutation' } & {
  reqPwReset?: Maybe<
    { __typename?: 'TokenResponse' } & Pick<TokenResponse, 'success' | 'token'>
  >
}

export type SetStarMutationVariables = Exact<{
  mentorId: Scalars['Int']
  lessonId: Scalars['Int']
  comment?: Maybe<Scalars['String']>
}>

export type SetStarMutation = { __typename?: 'Mutation' } & {
  setStar: { __typename?: 'SuccessResponse' } & Pick<SuccessResponse, 'success'>
}

export type SignupMutationVariables = Exact<{
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  username: Scalars['String']
}>

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup?: Maybe<
    { __typename?: 'AuthResponse' } & Pick<
      AuthResponse,
      'success' | 'username' | 'error'
    >
  >
}

export type UpdateChallengeMutationVariables = Exact<{
  lessonId: Scalars['Int']
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  id: Scalars['Int']
}>

export type UpdateChallengeMutation = { __typename?: 'Mutation' } & {
  updateChallenge?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Lesson' } & Pick<
          Lesson,
          | 'id'
          | 'docUrl'
          | 'githubUrl'
          | 'videoUrl'
          | 'chatUrl'
          | 'order'
          | 'description'
          | 'title'
        > & {
            challenges?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'Challenge' } & Pick<
                    Challenge,
                    'id' | 'description' | 'lessonId' | 'title' | 'order'
                  >
                >
              >
            >
          }
      >
    >
  >
}

export type UpdateLessonMutationVariables = Exact<{
  id: Scalars['Int']
  docUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  videoUrl?: Maybe<Scalars['String']>
  chatUrl?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}>

export type UpdateLessonMutation = { __typename?: 'Mutation' } & {
  updateLesson?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Lesson' } & Pick<
          Lesson,
          | 'id'
          | 'docUrl'
          | 'githubUrl'
          | 'videoUrl'
          | 'chatUrl'
          | 'order'
          | 'description'
          | 'title'
        > & {
            challenges?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'Challenge' } & Pick<
                    Challenge,
                    'id' | 'description' | 'lessonId' | 'title' | 'order'
                  >
                >
              >
            >
          }
      >
    >
  >
}

export type ChangePwMutationVariables = Exact<{
  token: Scalars['String']
  password: Scalars['String']
}>

export type ChangePwMutation = { __typename?: 'Mutation' } & {
  changePw?: Maybe<
    { __typename?: 'AuthResponse' } & Pick<AuthResponse, 'success'>
  >
}

export type UserInfoQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserInfoQuery = { __typename?: 'Query' } & {
  lessons: Array<
    { __typename?: 'Lesson' } & Pick<
      Lesson,
      | 'id'
      | 'title'
      | 'description'
      | 'docUrl'
      | 'githubUrl'
      | 'videoUrl'
      | 'order'
      | 'chatUrl'
    > & {
        challenges?: Maybe<
          Array<
            Maybe<
              { __typename?: 'Challenge' } & Pick<
                Challenge,
                'id' | 'title' | 'description' | 'order'
              >
            >
          >
        >
      }
  >
  userInfo?: Maybe<
    { __typename?: 'Session' } & {
      user?: Maybe<
        { __typename?: 'User' } & Pick<User, 'id' | 'username' | 'name'>
      >
      submissions?: Maybe<
        Array<
          Maybe<
            { __typename?: 'Submission' } & Pick<
              Submission,
              | 'id'
              | 'status'
              | 'mrUrl'
              | 'diff'
              | 'viewCount'
              | 'comment'
              | 'order'
              | 'challengeId'
              | 'lessonId'
              | 'createdAt'
              | 'updatedAt'
            > & {
                reviewer?: Maybe<
                  { __typename?: 'User' } & Pick<User, 'id' | 'username'>
                >
              }
          >
        >
      >
      lessonStatus: Array<
        { __typename?: 'UserLesson' } & Pick<
          UserLesson,
          'lessonId' | 'isPassed' | 'isTeaching' | 'isEnrolled'
        > & {
            starsReceived?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'Star' } & Pick<Star, 'lessonId' | 'comment'>
                >
              >
            >
          }
      >
    }
  >
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

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

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
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
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Lesson: ResolverTypeWrapper<Lesson>
  String: ResolverTypeWrapper<Scalars['String']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Challenge: ResolverTypeWrapper<Challenge>
  User: ResolverTypeWrapper<User>
  UserLesson: ResolverTypeWrapper<UserLesson>
  Star: ResolverTypeWrapper<Star>
  Session: ResolverTypeWrapper<Session>
  Submission: ResolverTypeWrapper<Submission>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Alert: ResolverTypeWrapper<Alert>
  Mutation: ResolverTypeWrapper<{}>
  SuccessResponse: ResolverTypeWrapper<SuccessResponse>
  AuthResponse: ResolverTypeWrapper<AuthResponse>
  TokenResponse: ResolverTypeWrapper<TokenResponse>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Lesson: Lesson
  String: Scalars['String']
  Int: Scalars['Int']
  Challenge: Challenge
  User: User
  UserLesson: UserLesson
  Star: Star
  Session: Session
  Submission: Submission
  Boolean: Scalars['Boolean']
  Alert: Alert
  Mutation: {}
  SuccessResponse: SuccessResponse
  AuthResponse: AuthResponse
  TokenResponse: TokenResponse
  Upload: Scalars['Upload']
}

export type AlertResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Alert'] = ResolversParentTypes['Alert']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  urlCaption?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type AuthResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']
> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  cliToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type ChallengeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  lessonId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type LessonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Lesson'] = ResolversParentTypes['Lesson']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  docUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  githubUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  videoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  challenges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Challenge']>>>,
    ParentType,
    ContextType
  >
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  chatUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  setStar?: Resolver<
    ResolversTypes['SuccessResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSetStarArgs, 'mentorId' | 'lessonId'>
  >
  login?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'username' | 'password'>
  >
  logout?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType
  >
  reqPwReset?: Resolver<
    Maybe<ResolversTypes['TokenResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationReqPwResetArgs, 'userOrEmail'>
  >
  changePw?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePwArgs, 'token' | 'password'>
  >
  changeAdminRights?: Resolver<
    Maybe<ResolversTypes['SuccessResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationChangeAdminRightsArgs, 'id' | 'status'>
  >
  signup?: Resolver<
    Maybe<ResolversTypes['AuthResponse']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationSignupArgs,
      'firstName' | 'lastName' | 'email' | 'username'
    >
  >
  addAlert?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Alert']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationAddAlertArgs, 'text' | 'type'>
  >
  removeAlert?: Resolver<
    Maybe<ResolversTypes['SuccessResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationRemoveAlertArgs, 'id'>
  >
  createSubmission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateSubmissionArgs,
      'lessonId' | 'challengeId' | 'cliToken' | 'diff'
    >
  >
  acceptSubmission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType,
    RequireFields<MutationAcceptSubmissionArgs, 'id' | 'comment'>
  >
  rejectSubmission?: Resolver<
    Maybe<ResolversTypes['Submission']>,
    ParentType,
    ContextType,
    RequireFields<MutationRejectSubmissionArgs, 'id' | 'comment'>
  >
  createLesson?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Lesson']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateLessonArgs, 'description' | 'title' | 'order'>
  >
  updateLesson?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Lesson']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLessonArgs, 'id'>
  >
  createChallenge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Lesson']>>>,
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateChallengeArgs,
      'lessonId' | 'order' | 'description' | 'title'
    >
  >
  updateChallenge?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Lesson']>>>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChallengeArgs, 'lessonId' | 'id'>
  >
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  lessons?: Resolver<Array<ResolversTypes['Lesson']>, ParentType, ContextType>
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>
  allUsers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >
  getLessonMentors?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetLessonMentorsArgs, 'lessonId'>
  >
  userInfo?: Resolver<
    Maybe<ResolversTypes['Session']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserInfoArgs, 'username'>
  >
  isTokenValid?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<QueryIsTokenValidArgs, 'cliToken'>
  >
  submissions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Submission']>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySubmissionsArgs, 'lessonId'>
  >
  alerts?: Resolver<Array<ResolversTypes['Alert']>, ParentType, ContextType>
}

export type SessionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']
> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  submissions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Submission']>>>,
    ParentType,
    ContextType
  >
  lessonStatus?: Resolver<
    Array<ResolversTypes['UserLesson']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type StarResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Star'] = ResolversParentTypes['Star']
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  studentId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  mentorId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  lessonId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SubmissionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Submission'] = ResolversParentTypes['Submission']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  mrUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  diff?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  viewCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  lessonId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  challengeId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  challenge?: Resolver<
    Maybe<ResolversTypes['Challenge']>,
    ParentType,
    ContextType
  >
  reviewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  reviewerId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type SuccessResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SuccessResponse'] = ResolversParentTypes['SuccessResponse']
> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type TokenResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TokenResponse'] = ResolversParentTypes['TokenResponse']
> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  userLesson?: Resolver<
    Maybe<ResolversTypes['UserLesson']>,
    ParentType,
    ContextType
  >
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isAdmin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  cliToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UserLessonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserLesson'] = ResolversParentTypes['UserLesson']
> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  lessonId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isPassed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isTeaching?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  isEnrolled?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  starsReceived?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Star']>>>,
    ParentType,
    ContextType
  >
  starGiven?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Alert?: AlertResolvers<ContextType>
  AuthResponse?: AuthResponseResolvers<ContextType>
  Challenge?: ChallengeResolvers<ContextType>
  Lesson?: LessonResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Session?: SessionResolvers<ContextType>
  Star?: StarResolvers<ContextType>
  Submission?: SubmissionResolvers<ContextType>
  SuccessResponse?: SuccessResponseResolvers<ContextType>
  TokenResponse?: TokenResponseResolvers<ContextType>
  Upload?: GraphQLScalarType
  User?: UserResolvers<ContextType>
  UserLesson?: UserLessonResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>

export const AcceptSubmissionDocument = gql`
  mutation acceptSubmission($submissionId: String!, $comment: String!) {
    acceptSubmission(id: $submissionId, comment: $comment) {
      id
      comment
      status
    }
  }
`
export type AcceptSubmissionMutationFn = ApolloReactCommon.MutationFunction<
  AcceptSubmissionMutation,
  AcceptSubmissionMutationVariables
>
export type AcceptSubmissionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >,
  'mutation'
>

export const AcceptSubmissionComponent = (
  props: AcceptSubmissionComponentProps
) => (
  <ApolloReactComponents.Mutation<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >
    mutation={AcceptSubmissionDocument}
    {...props}
  />
)

export type AcceptSubmissionProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >
} &
  TChildProps
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
 *   },
 * });
 */
export function useAcceptSubmissionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AcceptSubmissionMutation,
    AcceptSubmissionMutationVariables
  >(AcceptSubmissionDocument, baseOptions)
}
export type AcceptSubmissionMutationHookResult = ReturnType<
  typeof useAcceptSubmissionMutation
>
export type AcceptSubmissionMutationResult = ApolloReactCommon.MutationResult<AcceptSubmissionMutation>
export type AcceptSubmissionMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type AddAlertMutationFn = ApolloReactCommon.MutationFunction<
  AddAlertMutation,
  AddAlertMutationVariables
>
export type AddAlertComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    AddAlertMutation,
    AddAlertMutationVariables
  >,
  'mutation'
>

export const AddAlertComponent = (props: AddAlertComponentProps) => (
  <ApolloReactComponents.Mutation<AddAlertMutation, AddAlertMutationVariables>
    mutation={AddAlertDocument}
    {...props}
  />
)

export type AddAlertProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    AddAlertMutation,
    AddAlertMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddAlertMutation,
    AddAlertMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddAlertMutation,
    AddAlertMutationVariables
  >(AddAlertDocument, baseOptions)
}
export type AddAlertMutationHookResult = ReturnType<typeof useAddAlertMutation>
export type AddAlertMutationResult = ApolloReactCommon.MutationResult<AddAlertMutation>
export type AddAlertMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddAlertMutation,
  AddAlertMutationVariables
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
export type UsersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>,
  'query'
>

export const UsersComponent = (props: UsersComponentProps) => (
  <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables>
    query={UsersDocument}
    {...props}
  />
)

export type UsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<UsersQuery, UsersQueryVariables>
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
export const ChangeAdminRightsDocument = gql`
  mutation changeAdminRights($id: Int!, $status: String!) {
    changeAdminRights(id: $id, status: $status) {
      success
    }
  }
`
export type ChangeAdminRightsMutationFn = ApolloReactCommon.MutationFunction<
  ChangeAdminRightsMutation,
  ChangeAdminRightsMutationVariables
>
export type ChangeAdminRightsComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >,
  'mutation'
>

export const ChangeAdminRightsComponent = (
  props: ChangeAdminRightsComponentProps
) => (
  <ApolloReactComponents.Mutation<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >
    mutation={ChangeAdminRightsDocument}
    {...props}
  />
)

export type ChangeAdminRightsProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeAdminRightsMutation,
    ChangeAdminRightsMutationVariables
  >(ChangeAdminRightsDocument, baseOptions)
}
export type ChangeAdminRightsMutationHookResult = ReturnType<
  typeof useChangeAdminRightsMutation
>
export type ChangeAdminRightsMutationResult = ApolloReactCommon.MutationResult<ChangeAdminRightsMutation>
export type ChangeAdminRightsMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
  }
`
export type CreateChallengeMutationFn = ApolloReactCommon.MutationFunction<
  CreateChallengeMutation,
  CreateChallengeMutationVariables
>
export type CreateChallengeComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >,
  'mutation'
>

export const CreateChallengeComponent = (
  props: CreateChallengeComponentProps
) => (
  <ApolloReactComponents.Mutation<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >
    mutation={CreateChallengeDocument}
    {...props}
  />
)

export type CreateChallengeProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateChallengeMutation,
    CreateChallengeMutationVariables
  >(CreateChallengeDocument, baseOptions)
}
export type CreateChallengeMutationHookResult = ReturnType<
  typeof useCreateChallengeMutation
>
export type CreateChallengeMutationResult = ApolloReactCommon.MutationResult<CreateChallengeMutation>
export type CreateChallengeMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
    $description: String!
    $title: String!
  ) {
    createLesson(
      docUrl: $docUrl
      githubUrl: $githubUrl
      videoUrl: $videoUrl
      chatUrl: $chatUrl
      order: $order
      description: $description
      title: $title
    ) {
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
  }
`
export type CreateLessonMutationFn = ApolloReactCommon.MutationFunction<
  CreateLessonMutation,
  CreateLessonMutationVariables
>
export type CreateLessonComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >,
  'mutation'
>

export const CreateLessonComponent = (props: CreateLessonComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >
    mutation={CreateLessonDocument}
    {...props}
  />
)

export type CreateLessonProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >
} &
  TChildProps
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
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateLessonMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateLessonMutation,
    CreateLessonMutationVariables
  >(CreateLessonDocument, baseOptions)
}
export type CreateLessonMutationHookResult = ReturnType<
  typeof useCreateLessonMutation
>
export type CreateLessonMutationResult = ApolloReactCommon.MutationResult<CreateLessonMutation>
export type CreateLessonMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateLessonMutation,
  CreateLessonMutationVariables
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
        isPassed
        isTeaching
        isEnrolled
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
export type GetAppComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAppQuery,
    GetAppQueryVariables
  >,
  'query'
>

export const GetAppComponent = (props: GetAppComponentProps) => (
  <ApolloReactComponents.Query<GetAppQuery, GetAppQueryVariables>
    query={GetAppDocument}
    {...props}
  />
)

export type GetAppProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    GetAppQuery,
    GetAppQueryVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAppQuery,
    GetAppQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppDocument,
    baseOptions
  )
}
export function useGetAppLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAppQuery,
    GetAppQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetAppQuery, GetAppQueryVariables>(
    GetAppDocument,
    baseOptions
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = ApolloReactCommon.QueryResult<
  GetAppQuery,
  GetAppQueryVariables
>
export const LessonMentorsDocument = gql`
  query lessonMentors($lessonId: String!) {
    getLessonMentors(lessonId: $lessonId) {
      username
      name
      id
    }
  }
`
export type LessonMentorsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >,
  'query'
> &
  (
    | { variables: LessonMentorsQueryVariables; skip?: boolean }
    | { skip: boolean }
  )

export const LessonMentorsComponent = (props: LessonMentorsComponentProps) => (
  <ApolloReactComponents.Query<LessonMentorsQuery, LessonMentorsQueryVariables>
    query={LessonMentorsDocument}
    {...props}
  />
)

export type LessonMentorsProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >(LessonMentorsDocument, baseOptions)
}
export function useLessonMentorsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    LessonMentorsQuery,
    LessonMentorsQueryVariables
  >(LessonMentorsDocument, baseOptions)
}
export type LessonMentorsQueryHookResult = ReturnType<
  typeof useLessonMentorsQuery
>
export type LessonMentorsLazyQueryHookResult = ReturnType<
  typeof useLessonMentorsLazyQuery
>
export type LessonMentorsQueryResult = ApolloReactCommon.QueryResult<
  LessonMentorsQuery,
  LessonMentorsQueryVariables
>
export const SubmissionsDocument = gql`
  query submissions($lessonId: String!) {
    submissions(lessonId: $lessonId) {
      id
      status
      diff
      comment
      challenge {
        title
      }
      challengeId
      lessonId
      user {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`
export type SubmissionsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >,
  'query'
> &
  ({ variables: SubmissionsQueryVariables; skip?: boolean } | { skip: boolean })

export const SubmissionsComponent = (props: SubmissionsComponentProps) => (
  <ApolloReactComponents.Query<SubmissionsQuery, SubmissionsQueryVariables>
    query={SubmissionsDocument}
    {...props}
  />
)

export type SubmissionsProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<SubmissionsQuery, SubmissionsQueryVariables>(
    SubmissionsDocument,
    baseOptions
  )
}
export function useSubmissionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    SubmissionsQuery,
    SubmissionsQueryVariables
  >(SubmissionsDocument, baseOptions)
}
export type SubmissionsQueryHookResult = ReturnType<typeof useSubmissionsQuery>
export type SubmissionsLazyQueryHookResult = ReturnType<
  typeof useSubmissionsLazyQuery
>
export type SubmissionsQueryResult = ApolloReactCommon.QueryResult<
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LoginMutation,
    LoginMutationVariables
  >,
  'mutation'
>

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
)

export type LoginProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    LoginMutation,
    LoginMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>
export type LogoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
  'mutation'
>

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
)

export type LogoutProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const RejectSubmissionDocument = gql`
  mutation rejectSubmission($submissionId: String!, $comment: String!) {
    rejectSubmission(id: $submissionId, comment: $comment) {
      id
      comment
      status
    }
  }
`
export type RejectSubmissionMutationFn = ApolloReactCommon.MutationFunction<
  RejectSubmissionMutation,
  RejectSubmissionMutationVariables
>
export type RejectSubmissionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >,
  'mutation'
>

export const RejectSubmissionComponent = (
  props: RejectSubmissionComponentProps
) => (
  <ApolloReactComponents.Mutation<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >
    mutation={RejectSubmissionDocument}
    {...props}
  />
)

export type RejectSubmissionProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >
} &
  TChildProps
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
 *   },
 * });
 */
export function useRejectSubmissionMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RejectSubmissionMutation,
    RejectSubmissionMutationVariables
  >(RejectSubmissionDocument, baseOptions)
}
export type RejectSubmissionMutationHookResult = ReturnType<
  typeof useRejectSubmissionMutation
>
export type RejectSubmissionMutationResult = ApolloReactCommon.MutationResult<RejectSubmissionMutation>
export type RejectSubmissionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RejectSubmissionMutation,
  RejectSubmissionMutationVariables
>
export const RemoveAlertDocument = gql`
  mutation removeAlert($id: String!) {
    removeAlert(id: $id) {
      success
    }
  }
`
export type RemoveAlertMutationFn = ApolloReactCommon.MutationFunction<
  RemoveAlertMutation,
  RemoveAlertMutationVariables
>
export type RemoveAlertComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >,
  'mutation'
>

export const RemoveAlertComponent = (props: RemoveAlertComponentProps) => (
  <ApolloReactComponents.Mutation<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >
    mutation={RemoveAlertDocument}
    {...props}
  />
)

export type RemoveAlertProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveAlertMutation,
    RemoveAlertMutationVariables
  >(RemoveAlertDocument, baseOptions)
}
export type RemoveAlertMutationHookResult = ReturnType<
  typeof useRemoveAlertMutation
>
export type RemoveAlertMutationResult = ApolloReactCommon.MutationResult<RemoveAlertMutation>
export type RemoveAlertMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveAlertMutation,
  RemoveAlertMutationVariables
>
export const ReqPwResetDocument = gql`
  mutation reqPwReset($userOrEmail: String!) {
    reqPwReset(userOrEmail: $userOrEmail) {
      success
      token
    }
  }
`
export type ReqPwResetMutationFn = ApolloReactCommon.MutationFunction<
  ReqPwResetMutation,
  ReqPwResetMutationVariables
>
export type ReqPwResetComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >,
  'mutation'
>

export const ReqPwResetComponent = (props: ReqPwResetComponentProps) => (
  <ApolloReactComponents.Mutation<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >
    mutation={ReqPwResetDocument}
    {...props}
  />
)

export type ReqPwResetProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ReqPwResetMutation,
    ReqPwResetMutationVariables
  >(ReqPwResetDocument, baseOptions)
}
export type ReqPwResetMutationHookResult = ReturnType<
  typeof useReqPwResetMutation
>
export type ReqPwResetMutationResult = ApolloReactCommon.MutationResult<ReqPwResetMutation>
export type ReqPwResetMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type SetStarMutationFn = ApolloReactCommon.MutationFunction<
  SetStarMutation,
  SetStarMutationVariables
>
export type SetStarComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SetStarMutation,
    SetStarMutationVariables
  >,
  'mutation'
>

export const SetStarComponent = (props: SetStarComponentProps) => (
  <ApolloReactComponents.Mutation<SetStarMutation, SetStarMutationVariables>
    mutation={SetStarDocument}
    {...props}
  />
)

export type SetStarProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    SetStarMutation,
    SetStarMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SetStarMutation,
    SetStarMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SetStarMutation,
    SetStarMutationVariables
  >(SetStarDocument, baseOptions)
}
export type SetStarMutationHookResult = ReturnType<typeof useSetStarMutation>
export type SetStarMutationResult = ApolloReactCommon.MutationResult<SetStarMutation>
export type SetStarMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
    }
  }
`
export type SignupMutationFn = ApolloReactCommon.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>
export type SignupComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignupMutation,
    SignupMutationVariables
  >,
  'mutation'
>

export const SignupComponent = (props: SignupComponentProps) => (
  <ApolloReactComponents.Mutation<SignupMutation, SignupMutationVariables>
    mutation={SignupDocument}
    {...props}
  />
)

export type SignupProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    SignupMutation,
    SignupMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    baseOptions
  )
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>
export const UpdateChallengeDocument = gql`
  mutation updateChallenge(
    $lessonId: Int!
    $order: Int
    $description: String
    $title: String
    $id: Int!
  ) {
    updateChallenge(
      id: $id
      lessonId: $lessonId
      order: $order
      description: $description
      title: $title
    ) {
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
  }
`
export type UpdateChallengeMutationFn = ApolloReactCommon.MutationFunction<
  UpdateChallengeMutation,
  UpdateChallengeMutationVariables
>
export type UpdateChallengeComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >,
  'mutation'
>

export const UpdateChallengeComponent = (
  props: UpdateChallengeComponentProps
) => (
  <ApolloReactComponents.Mutation<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
    mutation={UpdateChallengeDocument}
    {...props}
  />
)

export type UpdateChallengeProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateChallengeMutation,
    UpdateChallengeMutationVariables
  >(UpdateChallengeDocument, baseOptions)
}
export type UpdateChallengeMutationHookResult = ReturnType<
  typeof useUpdateChallengeMutation
>
export type UpdateChallengeMutationResult = ApolloReactCommon.MutationResult<UpdateChallengeMutation>
export type UpdateChallengeMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
    $order: Int
    $description: String
    $title: String
  ) {
    updateLesson(
      docUrl: $docUrl
      githubUrl: $githubUrl
      videoUrl: $videoUrl
      chatUrl: $chatUrl
      id: $id
      order: $order
      description: $description
      title: $title
    ) {
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
  }
`
export type UpdateLessonMutationFn = ApolloReactCommon.MutationFunction<
  UpdateLessonMutation,
  UpdateLessonMutationVariables
>
export type UpdateLessonComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >,
  'mutation'
>

export const UpdateLessonComponent = (props: UpdateLessonComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >
    mutation={UpdateLessonDocument}
    {...props}
  />
)

export type UpdateLessonProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >
} &
  TChildProps
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
 *      description: // value for 'description'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateLessonMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateLessonMutation,
    UpdateLessonMutationVariables
  >(UpdateLessonDocument, baseOptions)
}
export type UpdateLessonMutationHookResult = ReturnType<
  typeof useUpdateLessonMutation
>
export type UpdateLessonMutationResult = ApolloReactCommon.MutationResult<UpdateLessonMutation>
export type UpdateLessonMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateLessonMutation,
  UpdateLessonMutationVariables
>
export const ChangePwDocument = gql`
  mutation changePw($token: String!, $password: String!) {
    changePw(token: $token, password: $password) {
      success
    }
  }
`
export type ChangePwMutationFn = ApolloReactCommon.MutationFunction<
  ChangePwMutation,
  ChangePwMutationVariables
>
export type ChangePwComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ChangePwMutation,
    ChangePwMutationVariables
  >,
  'mutation'
>

export const ChangePwComponent = (props: ChangePwComponentProps) => (
  <ApolloReactComponents.Mutation<ChangePwMutation, ChangePwMutationVariables>
    mutation={ChangePwDocument}
    {...props}
  />
)

export type ChangePwProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    ChangePwMutation,
    ChangePwMutationVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangePwMutation,
    ChangePwMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangePwMutation,
    ChangePwMutationVariables
  >(ChangePwDocument, baseOptions)
}
export type ChangePwMutationHookResult = ReturnType<typeof useChangePwMutation>
export type ChangePwMutationResult = ApolloReactCommon.MutationResult<ChangePwMutation>
export type ChangePwMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
        isPassed
        isTeaching
        isEnrolled
        starsReceived {
          lessonId
          mentorId
          studentId
          studentUsername
          studentName
          lessonTitle
          lessonDifficulty
          comment
        }
      }
    }
  }
`
export type UserInfoComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    UserInfoQuery,
    UserInfoQueryVariables
  >,
  'query'
> &
  ({ variables: UserInfoQueryVariables; skip?: boolean } | { skip: boolean })

export const UserInfoComponent = (props: UserInfoComponentProps) => (
  <ApolloReactComponents.Query<UserInfoQuery, UserInfoQueryVariables>
    query={UserInfoDocument}
    {...props}
  />
)

export type UserInfoProps<
  TChildProps = {},
  TDataName extends string = 'data'
> = {
  [key in TDataName]: ApolloReactHoc.DataValue<
    UserInfoQuery,
    UserInfoQueryVariables
  >
} &
  TChildProps
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserInfoQuery,
    UserInfoQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    baseOptions
  )
}
export function useUserInfoLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserInfoQuery,
    UserInfoQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    baseOptions
  )
}
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>
export type UserInfoLazyQueryHookResult = ReturnType<
  typeof useUserInfoLazyQuery
>
export type UserInfoQueryResult = ApolloReactCommon.QueryResult<
  UserInfoQuery,
  UserInfoQueryVariables
>
