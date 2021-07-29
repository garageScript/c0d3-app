import { gql } from '@apollo/client'

const GET_ALERTS = gql`
  query getAlerts {
    alerts {
      id
      text
      type
      url
      urlCaption
    }
  }
`

export default GET_ALERTS
