import { gql } from '@apollo/client'

export const UNLINK_DISCORD = gql`
  mutation {
    unlinkDiscord {
      id
    }
  }
`
