import { gql } from '@apollo/client'

const ADD_EXERCISE_COMMENT = gql`
  mutation AddExerciseComment(
    $exerciseId: Int!
    $content: String!
    $parentId: Int
    $userPic: String
  ) {
    addExerciseComment(
      exerciseId: $exerciseId
      content: $content
      parentId: $parentId
      userPic: $userPic
    ) {
      id
      exerciseId
      authorId
      content
      userPic
      createdAt
      parentId
    }
  }
`
export default ADD_EXERCISE_COMMENT
