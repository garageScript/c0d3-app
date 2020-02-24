import { gql } from 'apollo-boost'

export const GET_LESSONS = gql`
  query Lessons {
    lessons {
      id
      title
      description
      order
      challenges {
        id
      }
    }
  }
`
