import { gql } from '@apollo/client'

const ADD_EXERCISE = gql`
  mutation addExercise(
    $moduleId: Int!
    $description: String!
    $answer: String!
    $testStr: String
    $explanation: String
  ) {
    addExercise(
      moduleId: $moduleId
      description: $description
      answer: $answer
      testStr: $testStr
      explanation: $explanation
    ) {
      id
      description
      answer
      explanation
    }
  }
`

export default ADD_EXERCISE
