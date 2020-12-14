import { gql } from 'apollo-boost'

const STAR_CARD_INFO = gql`
  query starCard($lessonId: String!) {
    getLessonMentors(lessonId: $lessonId) {
      username
      name
    }
    starsGiven(lessonId: $lessonId) {
      username
    }
  }
`

export default STAR_CARD_INFO
