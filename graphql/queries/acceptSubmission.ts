import { gql } from '@apollo/client'

const ACCEPT_SUBMISSION = gql`
  mutation acceptSubmission(
    $submissionId: Int!
    $comment: String!
    $lessonId: Int!
  ) {
    acceptSubmission(
      id: $submissionId
      comment: $comment
      lessonId: $lessonId
    ) {
      id
      comment
      status
    }
  }
`

export default ACCEPT_SUBMISSION
