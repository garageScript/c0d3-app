import { gql } from '@apollo/client'

const CHILD_COMMENTS = gql`
  query childComments($parentId: Int!) {
    getChildComments(parentId: $parentId) {
      id
      exerciseId
      authorId
      content
      userPic
      createdAt
      updatedAt
      author {
        username
      }
      replies {
        id
        exerciseId
        authorId
        content
        userPic
        createdAt
        updatedAt
        author {
          username
        }
      }
    }
  }
`
export default CHILD_COMMENTS
