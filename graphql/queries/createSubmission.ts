import { gql } from '@apollo/client'

export const POST_SUBMISSION = gql`
  mutation createSubmission(
    $lessonId: Int!
    $challengeId: Int!
    $cliToken: String
    $diff: String!
  ) {
    createSubmission(
      lessonId: $lessonId
      challengeId: $challengeId
      cliToken: $cliToken
      diff: $diff
    ) {
      id
      diff
    }
  }
`
