import { gql } from '@apollo/client'

const UPDATE_USER_PASSWORD = gql`
  mutation updateUserPassword(
    $newPassword: String!
    $newPasswordAgain: String!
    $currentPassword: String!
  ) {
    updateUserPassword(
      newPassword: $newPassword
      newPasswordAgain: $newPasswordAgain
      currentPassword: $currentPassword
    ) {
      success
    }
  }
`

export default UPDATE_USER_PASSWORD
