import { gql } from '@apollo/client'
import LESSON_AND_CHALLENGE_INFO from './fragments/lessonAndChallengeFragment'

const UPDATE_CHALLENGE = gql`
  mutation updateChallenge(
    $lessonId: Int!
    $order: Int!
    $description: String!
    $title: String!
    $id: Int!
  ) {
    updateChallenge(
      id: $id
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

export default UPDATE_CHALLENGE
