import { gql } from '@apollo/client'

const UPDATE_MODULE = gql`
  mutation updateModule(
    $id: Int!
    $lessonId: Int!
    $name: String!
    $content: String!
    $order: Int!
  ) {
    updateModule(
      id: $id
      lessonId: $lessonId
      name: $name
      content: $content
      order: $order
    ) {
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
