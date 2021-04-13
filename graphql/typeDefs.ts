import { gql } from '@apollo/client'

export default gql`
  type Query {
    lessons: [Lesson!]!
    session: Session
    allUsers: [User]
    getLessonMentors(lessonId: Int!): [User]
    userInfo(username: String!): Session
    isTokenValid(cliToken: String!): Boolean!
    submissions(lessonId: Int!): [Submission]
    alerts: [Alert!]!
  }

  type TokenResponse {
    success: Boolean
    token: String
  }

  type Mutation {
    setStar(mentorId: Int!, lessonId: Int!, comment: String): SuccessResponse!
    login(username: String!, password: String!): AuthResponse
    logout: AuthResponse
    reqPwReset(userOrEmail: String!): TokenResponse
    changePw(token: String!, password: String!): AuthResponse
    changeAdminRights(id: Int!, status: Boolean!): SuccessResponse
    signup(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String
    ): AuthResponse
    addAlert(
      text: String!
      type: String!
      url: String
      urlCaption: String
    ): [Alert]
    removeAlert(id: Int!): SuccessResponse
    createSubmission(
      lessonId: Int!
      challengeId: Int!
      cliToken: String!
      diff: String!
    ): Submission
    acceptSubmission(id: Int!, comment: String!): Submission
    rejectSubmission(id: Int!, comment: String!): Submission
    createLesson(
      description: String!
      docUrl: String
      githubUrl: String
      videoUrl: String
      title: String!
      chatUrl: String
      order: Int!
    ): [Lesson]
    updateLesson(
      id: Int!
      description: String
      docUrl: String
      githubUrl: String
      videoUrl: String
      title: String
      chatUrl: String
      order: Int
    ): [Lesson]
    createChallenge(
      lessonId: Int!
      order: Int!
      description: String!
      title: String!
    ): [Lesson]
    updateChallenge(
      lessonId: Int!
      id: Int!
      order: Int
      description: String
      title: String
    ): [Lesson]
  }

  type AuthResponse {
    success: Boolean
    username: String
    error: String
    cliToken: String
  }

  type SuccessResponse {
    success: Boolean
  }

  type Submission {
    id: Int!
    status: String
    mrUrl: String
    diff: String
    viewCount: Int
    comment: String
    userId: String
    order: Int
    lessonId: Int!
    challengeId: Int!
    challenge: Challenge!
    reviewer: User
    user: User!
    reviewerId: String
    createdAt: String
    updatedAt: String
  }

  type User {
    id: Int!
    username: String
    userLesson: UserLesson
    email: String
    name: String
    isAdmin: Boolean!
    cliToken: String
  }

  type Session {
    user: User
    submissions: [Submission]
    lessonStatus: [UserLesson!]!
  }

  type UserLesson {
    id: Int!
    userId: String
    lessonId: Int!
    isPassed: String
    isTeaching: String
    isEnrolled: String
    starsReceived: [Star]
    starGiven: String
  }

  type Lesson {
    id: Int!
    description: String
    docUrl: String
    githubUrl: String
    videoUrl: String
    order: Int
    title: String
    challenges: [Challenge]
    users: [User]
    currentUser: User
    chatUrl: String
  }

  type Challenge {
    id: Int!
    description: String!
    lessonId: Int!
    title: String!
    order: Int!
  }

  type Alert {
    id: Int!
    text: String
    type: String
    url: String
    urlCaption: String
  }

  type Star {
    id: String!
    studentId: Int
    mentorId: Int
    lessonId: Int
    comment: String
  }
`
