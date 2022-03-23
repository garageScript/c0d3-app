import { gql } from '@apollo/client'
import SUBMISSIONS_INFO from './fragments/submissionsFragment'

const GET_PREVIOUS_SUBMISSIONS = gql`
  ${SUBMISSIONS_INFO}
  query getPreviousSubmissions($challengeId: Int!, $userId: Int!) {
    getPreviousSubmissions(challengeId: $challengeId, userId: $userId) {
      ...submissionsInfo
    }
  }
`

export default GET_PREVIOUS_SUBMISSIONS
