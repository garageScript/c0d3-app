import { gql } from 'apollo-boost'

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
