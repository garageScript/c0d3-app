import { gql } from '@apollo/client'

const UPDATE_EXERCISE = gql`
  mutation updateExercise(
    $id: Int!
    $answer: String!
    $moduleId: Int!
    $description: String!
    $flaggedAt: String
  ) {
    updateExercise(
      id: $id
      answer: $answer
      moduleId: $moduleId
      description: $description
      flaggedAt: $flaggedAt
    ) {
      id
    }
  }
`

export default UPDATE_EXERCISE
