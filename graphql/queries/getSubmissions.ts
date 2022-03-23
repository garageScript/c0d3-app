import { gql } from '@apollo/client'
import SUBMISSIONS_INFO from './fragments/submissionsFragment'

const GET_SUBMISSIONS = gql`
  ${SUBMISSIONS_INFO}
  query submissions($lessonId: Int!) {
    submissions(lessonId: $lessonId) {
      ...submissionsInfo
    }
  }
`

export default GET_SUBMISSIONS
