import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import withQueryLoader, {
  WithQueryProps
} from '../../containers/withQueryLoader'
import Layout from '../../components/Layout'
import ReviewCard from '../../components/ReviewCard'
import LessonTitleCard from '../../components/LessonTitleCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import { GET_APP, GET_SUBMISSIONS } from '../../graphql/queries'
import { Lesson } from '../../@types/lesson'
import { SubmissionData } from '../../@types/submission'
import { User } from '../../@types/session'
import _ from 'lodash'

type SubmissionDisplayProps = {
  user: User
  submissions: SubmissionData[]
}

const SubmissionDisplay: React.FC<SubmissionDisplayProps> = ({
  user,
  submissions
}) => (
  <div className="submissions-container">
    {submissions.map((submission: SubmissionData) => (
      <ReviewCard
        key={submission.id}
        reviewerId={Number(user.id)}
        submissionData={submission}
      />
    ))}
  </div>
)

const Review: React.FC<WithQueryProps> = ({ queryData }) => {
  const { lessons, session } = queryData
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: { lessonId: currentlessonId }
  })
  if (loading) {
    return <LoadingSpinner />
  }
  const lessonSubmissions: SubmissionData[] = data.submissions.filter(
    (submission: SubmissionData) =>
      submission.status !== 'passed' && submission.status !== 'needMoreWork'
  )
  const currentLesson: Lesson = lessons.find(
    (lesson: Lesson) => lesson.id.toString() === currentlessonId
  )
  return (
    <div>
      <Layout>
        <div className="row mt-4">
          <LessonTitleCard
            lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
            lessonUrl={currentLesson.docUrl}
            lessonTitle={currentLesson.title}
            lessonId={currentlessonId}
            isPassed={true}
          />
          {currentLesson && (
            <SubmissionDisplay
              user={session.user}
              submissions={lessonSubmissions}
            />
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
