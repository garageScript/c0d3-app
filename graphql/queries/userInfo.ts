import { gql } from '@apollo/client'

const USER_INFO = gql`
  query userInfo($username: String!) {
    lessons {
      id
      title
      description
      docUrl
      githubUrl
      videoUrl
      order
      challenges {
        id
        title
        description
        order
      }
      chatUrl
    }
    userInfo(username: $username) {
      user {
        id
        username
        name
      }
      submissions {
        id
        status
        mrUrl
        diff
        viewCount
        comment
        order
        challengeId
        lessonId
        reviewer {
          id
          username
        }
        createdAt
        updatedAt
      }
      lessonStatus {
        lessonId
        passedAt
        starsReceived {
          lessonId
          comment
          student {
            username
            name
          }
          lesson {
            title
            order
          }
        }
      }
    }
  }
`

export default USER_INFO
