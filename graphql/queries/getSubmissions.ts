import { gql } from 'apollo-boost'

const GET_SUBMISSIONS = gql`
  query submissions($lessonId: String!) {
    submissions(lessonId: $lessonId) {
      id
      status
      diff
      comment
      challengeId
      user {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`

export default GET_SUBMISSIONS
