import { gql } from '@apollo/client'
import LESSON_AND_CHALLENGE_INFO from './fragments/lessonAndChallengeFragment'

const CREATE_LESSON = gql`
  mutation createLesson(
    $docUrl: String
    $githubUrl: String
    $videoUrl: String
    $chatUrl: String
    $order: Int!
    $slug: String!
    $description: String!
    $title: String!
  ) {
    createLesson(
      docUrl: $docUrl
      githubUrl: $githubUrl
      videoUrl: $videoUrl
      chatUrl: $chatUrl
      order: $order
      slug: $slug
      description: $description
      title: $title
    ) {
      ...lessonAndChallengeInfo
      slug
    }
  }
  ${LESSON_AND_CHALLENGE_INFO}
`

export default CREATE_LESSON
