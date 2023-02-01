import { gql } from '@apollo/client'

const EDIT_EXERCISE_COMMENT = gql`
  mutation editExerciseComment($id: Int!, $content: String!) {
    editExerciseComment(id: $id, content: $content) {
      id
      content
    }
  }
`
export default EDIT_EXERCISE_COMMENT
