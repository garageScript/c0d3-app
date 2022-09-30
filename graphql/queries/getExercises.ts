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
      id
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
    exerciseSubmissions {
      exerciseId
      userAnswer
    }
  }
`

export default GET_EXERCISES
