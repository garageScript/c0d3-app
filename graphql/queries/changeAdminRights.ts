import { gql } from '@apollo/client'

const CHANGE_ADMIN_RIGHTS = gql`
  mutation changeAdminRights($id: Int!, $status: Boolean!) {
    changeAdminRights(id: $id, status: $status) {
      success
    }
  }
`

export default CHANGE_ADMIN_RIGHTS
