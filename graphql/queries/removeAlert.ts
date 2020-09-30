import { gql } from 'apollo-boost'

const REMOVE_ALERT = gql`
  mutation removeAlert($id: String!) {
    removeAlert(id: $id) {
      success
    }
  }
`

export default REMOVE_ALERT
