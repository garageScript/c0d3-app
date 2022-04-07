import { gql } from '@apollo/client'
import LESSON_AND_CHALLENGE_INFO from './fragments/lessonAndChallengeFragment'

const UPDATE_LESSON = gql`
  mutation updateLesson(
    $id: Int!
    $docUrl: String
    $githubUrl: String
    $videoUrl: String
    $chatUrl: String
    $order: Int!
    $slug: String!
    $description: String!
    $title: String!
  ) {
    updateLesson(
      docUrl: $docUrl
      githubUrl: $githubUrl
      videoUrl: $videoUrl
      chatUrl: $chatUrl
      id: $id
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

export default UPDATE_LESSON
