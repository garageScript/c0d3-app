import { gql } from '@apollo/client'

const REMOVE_EXERCISE = gql`
  mutation removeExercise($id: Int!) {
    removeExercise(id: $id) {
      id
    }
  }
`

export default REMOVE_EXERCISE
