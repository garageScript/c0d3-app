import { gql } from 'apollo-boost'

export const LOGOUT_USER = gql`
  mutation {
    logout {
      success
      username
      error
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      username
      error
    }
  }
`

export const SIGNUP_USER = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      success
      username
      error
    }
  }
`

export const GET_LESSONS = gql`
  query Lessons {
    curriculumStatus {
      id
      description
      title
      order
      docUrl
      challenges {
        id
      }
      currentUser {
        userLesson {
          isEnrolled
          isTeaching
          isPassed
        }
      }
    }
    lessons {
      id
      title
      description
      order
      docUrl
      challenges {
        id
        description
        title
        order
      }
    }
  }
`

export const GET_LESSON = gql`
  query lessonInfo(
    $lessonInfo: LessonId
    $lessonUserInfo: LessonUserId
    $lessonStatus: LessonId
  ) {
    lessonInfo(input: $lessonInfo) {
      id
      title
      description
      order
      docUrl
      chatUrl
      challenges {
        id
        description
        title
        order
      }
    }
    userSubmissions(input: $lessonUserInfo) {
      id
      status
      mrUrl
      diff
      viewCount
      comment
      challengeId
      reviewer {
        id
        username
      }
      createdAt
      updatedAt
    }
    lessonStatus(input: $lessonStatus) {
      isPassed
      isTeaching
      isEnrolled
    }
  }
`

export const GET_SUBMISSIONS = gql`
  query submissions($in: LessonId) {
    submissions(input: $in) {
      status
    }
  }
`

export const GET_APP = gql`
  query {
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
      }
    }
  }
`
