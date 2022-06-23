import { gql } from '@apollo/client'

const DELETE_EXERCISE = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      id
    }
  }
`

export default DELETE_EXERCISE
