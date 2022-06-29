import { gql } from '@apollo/client'

const FLAG_EXERCISE = gql`
  mutation flagExercise($id: Int!, $flagReason: String!) {
    flagExercise(id: $id, flagReason: $flagReason) {
      id
    }
  }
`

export default FLAG_EXERCISE
