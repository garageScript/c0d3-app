import { gql } from '@apollo/client'

const LESSON_AND_CHALLENGE_INFO = gql`
  fragment lessonAndChallengeInfo on Lesson {
    id
    docUrl
    githubUrl
    videoUrl
    chatUrl
    order
    description
    title
    challenges {
      id
      description
      lessonId
      title
      order
    }
  }
`

export default LESSON_AND_CHALLENGE_INFO
