import { gql } from '@apollo/client'

const ACCEPT_SUBMISSION = gql`
  mutation acceptSubmission($submissionId: String!, $comment: String!) {
    acceptSubmission(id: $submissionId, comment: $comment) {
      id
      comment
      status
    }
  }
`

export default ACCEPT_SUBMISSION
