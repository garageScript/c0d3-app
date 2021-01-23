import { gql } from '@apollo/client'

const LOGOUT_USER = gql`
  mutation logout {
    logout {
      success
      username
      error
    }
  }
`

export default LOGOUT_USER
