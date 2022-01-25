import { gql } from '@apollo/client'

const GET_PREVIOUS_SUBMISSIONS = gql`
  query getPreviousSubmissions($challengeId: Int!, $userId: Int!) {
    getPreviousSubmissions(challengeId: $challengeId, userId: $userId) {
      id
      status
      diff
      comment
      challenge {
        title
        description
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
      comments {
        content
        submissionId
        createdAt
        authorId
        line
        fileName
        author {
          username
          name
        }
      }
      createdAt
      updatedAt
    }
  }
`

export default GET_PREVIOUS_SUBMISSIONS
