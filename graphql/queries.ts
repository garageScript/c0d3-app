import { gql } from 'apollo-boost'

export const GET_LESSONS = gql`
  query Lessons {
    curriculumStatus {
      id
      description
      title
      order
      challenges {
        id
      }
      currentUser {
        userLesson {
          isEnrolled
          isTeaching
          isPassed
        }
      }
    }
    lessons {
      id
      title
      description
      order
      challenges {
        id
      }
    }
  }
`
