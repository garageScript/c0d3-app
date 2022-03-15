import { gql } from '@apollo/client'

const SIGNUP_USER = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      success
      username
      error
      cliToken
    }
  }
`

export default SIGNUP_USER
