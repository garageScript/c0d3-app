import { gql } from '@apollo/client'

const UPDATE_MODULE = gql`
  mutation updateModule(
    $id: Int!
    $lessonId: Int!
    $name: String!
    $content: String!
  ) {
    updateModule(id: $id, lessonId: $lessonId, name: $name, content: $content) {
      id
      name
      content
      lesson {
        title
      }
    }
  }
`

export default UPDATE_MODULE
