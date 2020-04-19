import { gql } from 'apollo-boost'

export const GET_LESSONS = gql`
  query Lessons {
    curriculumStatus {
      id
      description
      title
      order
      docUrl
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
      docUrl
      challenges {
        id
        description
        title
        order
      }
    }
  }
`

export const GET_LESSON = gql`
  query lessonInfo($lessonInfo: LessonId, $lessonUserInfo: LessonUserId) {
    lessonInfo(input: $lessonInfo) {
      id
      title
      description
      order
      docUrl
      challenges {
        id
        description
        title
        order
      }
    }
    userSubmissions(input: $lessonUserInfo) {
      id
      status
      mrUrl
      diff
      viewCount
      comment
      challengeId
      reviewer {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_SUBMISSIONS = gql`
  query submissions($in: LessonId) {
    submissions(input: $in) {
      status
    }
  }
`
