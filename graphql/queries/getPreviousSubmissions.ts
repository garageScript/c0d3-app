import { gql } from '@apollo/client'
import SUBMISSIONS_INFO from './fragments/submissionsFragment'

const GET_PREVIOUS_SUBMISSIONS = gql`
  query getPreviousSubmissions($challengeId: Int!, $userId: Int!) {
    getPreviousSubmissions(challengeId: $challengeId, userId: $userId) {
      ...submissionsInfo
    }
  }
  ${SUBMISSIONS_INFO}
`

export default GET_PREVIOUS_SUBMISSIONS
