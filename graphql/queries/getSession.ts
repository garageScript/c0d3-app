import { gql } from '@apollo/client'

const GET_SESSION = gql`
  query getSession {
    session {
      user {
        id
        username
        name
        isAdmin
        isConnectedToDiscord
        discordUserId
        discordUsername
        discordAvatarUrl
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
        starGiven
      }
    }
  }
`
export default GET_SESSION
