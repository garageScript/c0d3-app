import { gql } from '@apollo/client'
import SUBMISSIONS_INFO from './fragments/submissionsFragment'

const GET_SUBMISSIONS = gql`
  query submissions($lessonId: Int!) {
    submissions(lessonId: $lessonId) {
      ...submissionsInfo
    }
  }
  ${SUBMISSIONS_INFO}
`

export default GET_SUBMISSIONS
