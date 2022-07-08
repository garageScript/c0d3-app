import { gql } from '@apollo/client'

const GET_FLAGGED_EXERCISES = gql`
  query getFlaggedExercises {
    exercises {
      flaggedAt
      module {
        lesson {
          title
        }
      }
    }
  }
`

export default GET_FLAGGED_EXERCISES
