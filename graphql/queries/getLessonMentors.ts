import { gql } from '@apollo/client'

const LESSON_MENTORS = gql`
  query lessonMentors($lessonId: String!) {
    getLessonMentors(lessonId: $lessonId) {
      username
      name
      id
    }
  }
`

export default LESSON_MENTORS
