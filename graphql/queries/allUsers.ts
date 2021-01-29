import { gql } from '@apollo/client'

const ALL_USERS = gql`
  query users {
    allUsers {
      id
      username
      name
      isAdmin
      email
      cliToken
    }
  }
`

export default ALL_USERS
