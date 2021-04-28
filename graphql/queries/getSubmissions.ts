import { gql } from '@apollo/client'

const GET_SUBMISSIONS = gql`
  query submissions($lessonId: Int!) {
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
      reviewer {
        id
        username
        name
      }
      createdAt
      updatedAt
    }
  }
`

export default GET_SUBMISSIONS
