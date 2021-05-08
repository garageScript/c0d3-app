import { gql } from '@apollo/client'

const GET_COMMENTS = gql`
  query getComments($line: Int!, $submissionId: Int!, $userId: Int!) {
    getComments(line: $line, submissionId: $submissionId, userId: $userId) {
      content
      createdAt
      userId
    }
  }
`

export default GET_COMMENTS
