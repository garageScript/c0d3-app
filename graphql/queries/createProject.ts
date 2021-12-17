import { gql } from '@apollo/client'

const CREATE_PROJECT = gql`
  mutation createProject($title: String!, $description: String!) {
    createProject(title: $title, description: $description) {
      id
      title
      description
      slug
      members {
        id
      }
    }
  }
`

export default CREATE_PROJECT
