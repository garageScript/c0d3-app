import { gql } from '@apollo/client'

const FLAG_EXERCISE = gql`
  mutation flagExercise($id: Int!) {
    flagExercise(id: $id) {
      id
    }
  }
`

export default FLAG_EXERCISE
