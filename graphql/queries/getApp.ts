import { gql } from '@apollo/client'

const GET_APP = gql`
  query getApp {
    lessons {
      id
      title
      description
      docUrl
      githubUrl
      videoUrl
      order
      slug
      challenges {
        id
        title
        description
        order
      }
      modules {
        id
        name
        content
        order
      }
      chatUrl
    }
    session {
      user {
        id
        username
        name
        isAdmin
        isConnectedToDiscord
      }
      submissions {
        id
        status
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
        user {
          id
        }
        createdAt
        updatedAt
        comments {
          id
          content
          submissionId
          createdAt
          authorId
          line
          fileName
          author {
            username
            name
          }
        }
      }

      lessonStatus {
        lessonId
        passedAt
        starGiven
      }
    }
    alerts {
      id
      text
      type
      url
      urlCaption
    }
  }
`

export default GET_APP
