import { gql } from '@apollo/client'

const GET_SESSION = gql`
  query getSession {
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
          isAdmin
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
  }
`
export default GET_SESSION
