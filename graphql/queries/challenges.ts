import { gql } from '@apollo/client'

export const CHALLENGES = gql`
  query challenges($lessonId: Int) {
    challenges(lessonId: $lessonId) {
      id
      description
      lessonId
      title
      order
    }
  }
`
