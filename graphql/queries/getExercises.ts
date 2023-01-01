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
      author {
        id
        username
        email
        discordId
      }
      module {
        name
        lesson {
          slug
        }
      }
      removedAt
      description
      answer
      explanation
      flaggedAt
      flagReason
    }
    exerciseSubmissions {
      exerciseId
      userAnswer
    }
  }
`

export default GET_EXERCISES
