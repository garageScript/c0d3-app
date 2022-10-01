import { gql } from '@apollo/client'

const ADD_EXERCISE_SUBMISSION = gql`
  mutation AddExerciseSubmission($exerciseId: Int!, $userAnswer: String!) {
    addExerciseSubmission(exerciseId: $exerciseId, userAnswer: $userAnswer) {
      id
      exerciseId
      userId
      userAnswer
    }
  }
`

export default ADD_EXERCISE_SUBMISSION
