import { gql } from 'apollo-boost'

const ADD_ALERT = gql`
  mutation addAlert($text: String!, $type: String!) {
    addAlert(text: $text, type: $type) {
      id
      text
      type
      url
      urlCaption
    }
  }
`

export default ADD_ALERT
