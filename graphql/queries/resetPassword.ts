import { gql } from '@apollo/client'

const RESET_PASSWORD = gql`
  mutation reqPwReset($userOrEmail: String!) {
    reqPwReset(userOrEmail: $userOrEmail) {
      success
    }
  }
`

export default RESET_PASSWORD
