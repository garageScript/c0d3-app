import { gql } from 'apollo-boost'

export default gql`
  type Query {
    lessons: [Lesson]
    session: Session
    submissions(lessonId: String!): [Submission]
  }

  type Mutation {
    login(username: String!, password: String!): AuthResponse
    logout: AuthResponse
    signup(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
      password: String
    ): AuthResponse
  }

  type AuthResponse {
    success: Boolean
    username: String
    error: String
  }

  type Submission {
    id: String
    status: String
    mrUrl: String
    diff: String
    viewCount: Int
    comment: String
    userId: String
    order: Int
    lessonId: String
    challengeId: String
    challenge: Challenge
    reviewer: User
    user: User
    reviewerId: String
    createdAt: String
    updatedAt: String
  }

  type User {
    id: String
    username: String
    userLesson: UserLesson
    email: String
    name: String
    isAdmin: Boolean
  }

  type Session {
    user: User
    submissions: [Submission]
    lessonStatus: [UserLesson]
    alerts: [Alert]
  }

  type UserLesson {
    id: String
    userId: String
    lessonId: String
    isPassed: String
    isTeaching: String
    isEnrolled: String
    starGiven: User
    starComment: String
  }

  type Lesson {
    id: String
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
    id: String
    description: String
    lessonId: String
    title: String
    order: Int
  }
  type Alert {
    id: String
    text: String
    type: String
  }
`
