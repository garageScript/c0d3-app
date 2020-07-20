import { gql } from 'apollo-boost'

const CHECK_ADMIN_RIGHTS = gql`
  {
    adminRights
  }
`

export default CHECK_ADMIN_RIGHTS
