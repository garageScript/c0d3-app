import { gql } from '@apollo/client'

const ADD_COMMENT = gql`
  mutation addComment(
    $line: Int!
    $submissionId: Int!
    $content: String!
    $fileName: String!
    $authorId: Int!
  ) {
    addComment(
      line: $line
      submissionId: $submissionId
      content: $content
      fileName: $fileName
      authorId: $authorId
    ) {
      id
    }
  }
`

export default ADD_COMMENT
