import { gql } from 'apollo-boost'

const LESSON_MENTORS = gql`
  query lessonMentors($lessonId: String!) {
    getLessonMentors(lessonId: $lessonId) {
      username
      name
    }
  }
`

export default LESSON_MENTORS
