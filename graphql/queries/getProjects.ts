import { gql } from '@apollo/client'

const GET_PROJECTS = gql`
  query getProjects {
    projects {
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

export default GET_PROJECTS
