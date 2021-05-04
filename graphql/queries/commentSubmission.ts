import { gql } from '@apollo/client'

const COMMENT_SUBMISSION = gql`
  mutation commentSubmission($diff: String!, $id: Int!) {
    commentSubmission(id: $id, diff: $diff) {
      id
      diff
    }
  }
`

export default COMMENT_SUBMISSION
