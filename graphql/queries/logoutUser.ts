import { gql } from 'apollo-boost'

const LOGOUT_USER = gql`
  mutation {
    logout {
      success
      username
      error
    }
  }
`

export default LOGOUT_USER
