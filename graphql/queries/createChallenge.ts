import { gql } from '@apollo/client'
import LESSON_AND_CHALLENGE_INFO from './fragments/lessonAndChallengeFragment'

const CREATE_CHALLENGE = gql`
  mutation createChallenge(
    $lessonId: Int!
    $order: Int!
    $description: String!
    $title: String!
  ) {
    createChallenge(
      lessonId: $lessonId
      order: $order
      description: $description
      title: $title
    ) {
      ...lessonAndChallengeInfo
    }
  }
  ${LESSON_AND_CHALLENGE_INFO}
`

export default CREATE_CHALLENGE
