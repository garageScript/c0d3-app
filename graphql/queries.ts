import { gql } from 'apollo-boost'

export const GET_LESSONS = gql`
  {
    lessons {
      id
      title
    }
  }
`

export const GET_JOBS = gql`
  query {
    jobs {
      id
      title
      applyUrl
      company {
        name
      }
    }
  }
`
