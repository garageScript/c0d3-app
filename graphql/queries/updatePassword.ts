import { gql } from 'apollo-boost'

const UPDATE_PASSWORD = gql`
  mutation changePw($token: String!, $password: String!) {
    changePw(token: $token, password: $password) {
      success
    }
  }
`

export default UPDATE_PASSWORD
