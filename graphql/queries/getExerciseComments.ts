import { gql } from '@apollo/client'

const EXERCISE_COMMENTS = gql`
  query exerciseComments($exerciseId: Int!) {
    getExerciseComments(exerciseId: $exerciseId) {
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
export default EXERCISE_COMMENTS
