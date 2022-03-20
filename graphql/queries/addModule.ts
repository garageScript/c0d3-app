import { gql } from '@apollo/client'

const ADD_MODULE = gql`
  mutation addModule($content: String!, $lessonId: Int!, $name: String!) {
    addModule(content: $content, lessonId: $lessonId, name: $name) {
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
