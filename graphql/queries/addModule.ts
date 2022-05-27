import { gql } from '@apollo/client'

const ADD_MODULE = gql`
  mutation addModule(
    $content: String!
    $lessonId: Int!
    $name: String!
    $order: Int!
  ) {
    addModule(
      content: $content
      lessonId: $lessonId
      name: $name
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

export default ADD_MODULE
