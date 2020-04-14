import { gql } from 'apollo-boost'

export default gql`
  type Query {
    hello: String
    lessons: [Lesson]
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

  type AdoptedStudent {
    userId: String
    studentId: String
    lessonId: String
  }

  type User {
    id: String
    username: String
    userLesson: UserLesson
    email: String
    name: String
    isAdmin: Boolean
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

  type Star {
    lessonId: String
    studentId: String
    mentorId: String
    comment: String
  }

  type Announcement {
    id: String
    description: String
  }

  type UserData {
    name: String
    createdAt: String
    stars: [Star]
    lessons: [Lesson]
  }

  type Cohort {
    chatroomId: String
    id: String
    createdAt: String
  }

  type WaitListStudents {
    id: String
    email: String
    createdAt: String
    cohortId: String
  }

  type Domain {
    domain: String
    subDomain: String
    port: String
    ip: String
    id: String
    gitLink: String
    fullDomain: String
  }
`
