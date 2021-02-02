import { gql } from '@apollo/client'

const REJECT_SUBMISSION = gql`
  mutation rejectSubmission($submissionId: String!, $comment: String!) {
    rejectSubmission(id: $submissionId, comment: $comment) {
      id
      comment
      status
    }
  }
`

export default REJECT_SUBMISSION
