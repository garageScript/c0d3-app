import { gql } from '@apollo/client'

const DELETE_MODULE = gql`
  mutation deleteModule($id: Int!) {
    deleteModule(id: $id) {
      id
      lesson {
        title
      }
      name
      content
    }
  }
`

export default DELETE_MODULE
