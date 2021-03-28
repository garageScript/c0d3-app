import { gql } from '@apollo/client'

const REMOVE_ALERT = gql`
  mutation removeAlert($id: Int!) {
    removeAlert(id: $id) {
      success
    }
  }
`

export default REMOVE_ALERT
