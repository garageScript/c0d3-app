import { gql } from '@apollo/client'

const REJECT_SUBMISSION = gql`
  mutation rejectSubmission(
    $submissionId: Int!
    $comment: String!
    $lessonId: Int!
  ) {
    rejectSubmission(
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

export default REJECT_SUBMISSION
