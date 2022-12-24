import { gql } from '@apollo/client'

const UPDATE_USER_NAMES = gql`
  mutation updateUserNames($username: String!, $name: String!) {
    updateUserNames(username: $username, name: $name) {
      id
      username
      name
    }
  }
`

export default UPDATE_USER_NAMES
