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
    $password: String!
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

export const GET_SUBMISSIONS = gql`
  query submissions($lessonId: String!) {
    submissions(lessonId: $lessonId) {
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
    alerts {
      id
      text
      type
      url
    }
  }
`

export const ADD_ALERT = gql`
  mutation addAlert($text: String!, $type: String!) {
    addAlert(text: $text, type: $type) {
      success
    }
  }
`
