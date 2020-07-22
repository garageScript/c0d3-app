import { gql } from 'apollo-boost'

const ADMIN_STATUSES = gql`
  query adminStatuses {
    allUsers {
      username
      isAdmin
    }
  }
`

export default ADMIN_STATUSES
