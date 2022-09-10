import { gql } from '@apollo/client'

const EDIT_COMMENT = gql`
  mutation editComment($id: Int!, $content: String!) {
    editComment(id: $id, content: $content) {
      id
      content
    }
  }
`

export default EDIT_COMMENT
