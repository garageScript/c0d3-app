import { gql } from '@apollo/client'

const GET_COMMENTS = gql`
  query getComments($submissionId: Int!, $fileName: String!) {
    getComments(submissionId: $submissionId, fileName: $fileName) {
      content
      createdAt
      authorId
      line
      author {
        username
        name
      }
    }
  }
`

export default GET_COMMENTS
