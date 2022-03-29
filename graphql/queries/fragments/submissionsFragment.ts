import { gql } from '@apollo/client'

const SUBMISSIONS_INFO = gql`
  fragment submissionsInfo on Submission {
    id
    status
    diff
    comment
    challenge {
      title
      description
    }
    challengeId
    lessonId
    user {
      id
      username
    }
    reviewer {
      id
      username
      name
    }
    comments {
      id
      content
      submissionId
      createdAt
      authorId
      line
      fileName
      author {
        username
        name
      }
    }
    createdAt
    updatedAt
  }
`

export default SUBMISSIONS_INFO
