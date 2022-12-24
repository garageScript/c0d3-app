import { gql } from '@apollo/client'

export default gql`
  type Query {
    lessons: [Lesson!]!
    session: Session!
    allUsers: [User]
    modules: [Module]!
    exercises: [Exercise!]!
    challenges(lessonId: Int): [Challenge!]!
    getLessonMentors(lessonId: Int!): [User]
    userInfo(username: String!): Session
    isTokenValid(cliToken: String!): Boolean!
    submissions(lessonId: Int!): [Submission!]
    alerts: [Alert!]!
    getPreviousSubmissions(challengeId: Int!, userId: Int!): [Submission!]
    exerciseSubmissions: [ExerciseSubmission!]!
    getExerciseComments(exerciseId: Int!): [ExerciseComment!]!
    getChildComments(parentId: Int!): [ExerciseComment!]!
  }

  type TokenResponse {
    success: Boolean
    token: String
  }

  type Mutation {
    setStar(mentorId: Int!, lessonId: Int!, comment: String): SuccessResponse!
    login(username: String!, password: String!): AuthResponse
    logout: AuthResponse
    reqPwReset(userOrEmail: String!): SuccessResponse!
    changePw(token: String!, password: String!): AuthResponse
    changeAdminRights(id: Int!, status: Boolean!): SuccessResponse
    signup(
      firstName: String!
      lastName: String!
      email: String!
      username: String!
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
      cliToken: String
      diff: String!
    ): Submission
    acceptSubmission(id: Int!, comment: String!, lessonId: Int!): Submission
    rejectSubmission(id: Int!, comment: String!, lessonId: Int!): Submission
    addComment(
      line: Int
      fileName: String
      submissionId: Int!
      content: String!
    ): Comment
    deleteComment(id: Int!): Comment
    editComment(id: Int!, content: String!): Comment
    addModule(
      lessonId: Int!
      name: String!
      content: String!
      order: Int!
    ): Module!
    updateModule(
      id: Int!
      lessonId: Int!
      name: String!
      content: String!
      order: Int!
    ): Module!
    deleteModule(id: Int!): Module!
    addExercise(
      moduleId: Int!
      description: String!
      answer: String!
      testStr: String
      explanation: String
    ): Exercise!
    updateExercise(
      id: Int!
      moduleId: Int!
      description: String!
      answer: String!
      testStr: String
      explanation: String
    ): Exercise!
    flagExercise(id: Int!, flagReason: String!): Exercise
    removeExerciseFlag(id: Int!): Exercise!
    deleteExercise(id: Int!): Exercise!
    addExerciseSubmission(
      exerciseId: Int!
      userAnswer: String!
    ): ExerciseSubmission!
    addExerciseComment(
      exerciseId: Int!
      content: String!
      parentId: Int
      userPic: String
    ): ExerciseComment!
    createLesson(
      description: String!
      docUrl: String
      githubUrl: String
      videoUrl: String
      title: String!
      chatUrl: String
      order: Int!
      slug: String!
    ): [Lesson!]!
    updateLesson(
      id: Int!
      description: String!
      docUrl: String
      githubUrl: String
      videoUrl: String
      title: String!
      chatUrl: String
      order: Int!
      slug: String!
    ): [Lesson!]!
    createChallenge(
      lessonId: Int!
      order: Int!
      description: String!
      title: String!
    ): [Lesson]
    updateChallenge(
      lessonId: Int!
      order: Int!
      description: String!
      title: String!
      id: Int!
    ): [Lesson]
    unlinkDiscord: User
    updateUserNames(name: String!, username: String!): User
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
    status: SubmissionStatus!
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
    updatedAt: String!
    comments: [Comment!]
  }

  type Comment {
    id: Int!
    fileName: String
    line: Int
    content: String!
    authorId: Int!
    submissionId: Int!
    createdAt: String!
    author: User
    submission: Submission
  }

  enum SubmissionStatus {
    overwritten
    needMoreWork
    open
    passed
  }

  type User {
    id: Int!
    username: String!
    userLesson: UserLesson
    email: String!
    name: String!
    isAdmin: Boolean!
    isConnectedToDiscord: Boolean!
    cliToken: String
    discordId: String
    discordUserId: String!
    discordUsername: String!
    discordAvatarUrl: String!
  }

  type Session {
    user: User
    submissions: [Submission!]
    lessonStatus: [UserLesson!]!
  }

  type UserLesson {
    id: Int!
    userId: String
    lessonId: Int!
    passedAt: String
    starsReceived: [Star]
    starGiven: String
  }

  type Lesson {
    id: Int!
    description: String!
    docUrl: String
    githubUrl: String
    videoUrl: String
    order: Int!
    slug: String!
    title: String!
    challenges: [Challenge!]!
    users: [User]
    currentUser: User
    chatUrl: String
    modules: [Module!]
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
    id: Int!
    lessonId: Int!
    comment: String
    student: User!
    lesson: Lesson!
  }

  type Module {
    id: Int!
    author: User!
    lesson: Lesson!
    name: String!
    content: String!
    order: Int!
  }

  type Exercise {
    id: Int!
    author: User!
    module: Module!
    description: String!
    answer: String!
    testStr: String
    explanation: String
    removed: Boolean
    flaggedAt: String
    flagReason: String
    flaggedBy: User
    flaggedById: Int
  }

  type ExerciseSubmission {
    id: Int!
    userId: Int!
    exerciseId: Int!
    userAnswer: String!
  }

  type ExerciseComment {
    id: Int!
    createdAt: String!
    updatedAt: String
    authorId: Int!
    exerciseId: Int!
    userPic: String
    content: String!
    parentId: Int
    exercise: Exercise!
    author: User!
    parent: ExerciseComment
    replies: [ExerciseComment]
  }
`
