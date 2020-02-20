import gql from 'graphql-tag'

export const GET_LESSONS = gql`
  {
    lessons {
      id
      title
    }
  }
`
