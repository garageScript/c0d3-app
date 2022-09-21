import { gql } from '@apollo/client'

const GET_EXERCISES = gql`
  query GetExercises {
    lessons {
      title
      docUrl
      slug
    }
    alerts {
      id
      text
      type
      url
      urlCaption
    }
    exercises {
      module {
        name
        lesson {
          slug
        }
      }
      description
      answer
      explanation
    }
  }
`

export default GET_EXERCISES
