import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
  mutation reqPwReset($userOrEmail: String!) {
    reqPwReset(userOrEmail: $userOrEmail) {
      success
      token
    }
  }
`

export default RESET_PASSWORD
