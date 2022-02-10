import { gql } from '@apollo/client'

const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

export default DELETE_COMMENT
