import { gql } from '@apollo/client'

const REMOVE_EXERCISE_FLAG = gql`
  mutation removeExerciseFlag($id: Int!) {
    removeExerciseFlag(id: $id) {
      id
    }
  }
`

export default REMOVE_EXERCISE_FLAG
