import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import withQueryLoader, {
  WithQueryProps
} from '../../containers/withQueryLoader'
import Layout from '../../components/Layout'
import ReviewCard from '../../components/ReviewCard'
import { GET_APP, GET_SUBMISSIONS } from '../../graphql/queries'
import { Lesson } from '../../@types/lesson'
import _ from 'lodash'
import LoadingSpinner from '../../components/LoadingSpinner'

type SubmissionData = {
  id: string
  challengeId: string
  comment: string
  diff: string
  userId: string
  reviewerId: string
  status: string
  updatedAt: string
  createdAt: string
}

type SubmissionDisplayProps = {
  submissions: SubmissionData[]
}

const SubmissionDisplay: React.FC<SubmissionDisplayProps> = ({
  submissions
}) => (
  <>
    {submissions.map((submission: SubmissionData) => (
      <ReviewCard key={submission.id} submissionData={submission} />
    ))}
  </>
)

const Review: React.FC<WithQueryProps> = ({ queryData }) => {
  const { lessons } = queryData
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: { lessonId: currentlessonId }
  })
  if (loading) {
    return <LoadingSpinner />
  }
  const lessonSubmissions: SubmissionData[] = data.submissions.filter(
    (submission: SubmissionData) => submission.status !== 'passed'
  )
  const currentLesson: Lesson = lessons.find(
    (lesson: Lesson) => lesson.id.toString() === currentlessonId
  )
  return (
    <div>
      <Layout>
        <div className="row mt-4">
          {currentLesson && (
            <div className="review-container">
              <SubmissionDisplay submissions={lessonSubmissions} />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default withQueryLoader(
  {
    query: GET_APP
  },
  Review
)
