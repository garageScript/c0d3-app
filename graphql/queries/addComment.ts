import { gql } from '@apollo/client'

const ADD_COMMENT = gql`
  mutation addComment(
    $line: Int
    $submissionId: Int!
    $content: String!
    $fileName: String
  ) {
    addComment(
      line: $line
      submissionId: $submissionId
      content: $content
      fileName: $fileName
    ) {
      id
    }
  }
`

export default ADD_COMMENT
