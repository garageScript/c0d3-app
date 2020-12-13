import { gql } from 'apollo-boost'

const GET_LESSON_MENTORS = gql`
  query getLessonMentors($lessonId: String!) {
    getLessonMentors(lessonId: $lessonId) {
      username
      name
    }
  }
`

export default GET_LESSON_MENTORS
