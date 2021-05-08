import { gql } from '@apollo/client'

const ADD_COMMENT = gql`
  mutation addComment(
    $line: Int!
    $submissionId: Int!
    $userId: Int!
    $content: String!
  ) {
    addComment(
      line: $line
      submissionId: $submissionId
      userId: $userId
      content: $content
    ) {
      id
    }
  }
`

export default ADD_COMMENT
