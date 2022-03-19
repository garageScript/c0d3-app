import { gql } from '@apollo/client'
import LESSON_AND_CHALLENGE_INFO from './fragments/lessonAndChallengeFragment'

const GET_LESSONS = gql`
  query getLessons {
    lessons {
      ...lessonAndChallengeInfo
      slug
    }
  }
  ${LESSON_AND_CHALLENGE_INFO}
`

export default GET_LESSONS
