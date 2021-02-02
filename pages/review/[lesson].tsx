import { useQuery } from '@apollo/client'
import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ReviewCard from '../../components/ReviewCard'
import LessonTitleCard from '../../components/LessonTitleCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import GET_APP from '../../graphql/queries/getApp'
import GET_SUBMISSIONS from '../../graphql/queries/getSubmissions'
import { Lesson } from '../../@types/lesson'
import { SubmissionData } from '../../@types/submission'
import { AppData } from '../../@types/app'
import Error from '../../components/Error'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import _ from 'lodash'

type SubmissionDisplayProps = {
  submissions: SubmissionData[]
}

const SubmissionDisplay: React.FC<SubmissionDisplayProps> = ({
  submissions
}) => (
  <div className="submissions-container container p-0">
    {submissions.map((submission: SubmissionData) => (
      <ReviewCard key={submission.id} submissionData={submission} />
    ))}
  </div>
)

const Review: React.FC<QueryDataProps<AppData>> = ({ queryData }) => {
  const { lessons, session } = queryData
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: { lessonId: currentlessonId }
  })
  if (loading) {
    return <LoadingSpinner />
  }
  if (!session) {
    router.push('/login')
    return <LoadingSpinner />
  }
  const currentLesson: Lesson | undefined = lessons.find(
    (lesson: Lesson) => lesson.id === currentlessonId
  )
  if (!currentLesson) {
    return <Error title="404 error" message="Page not found" src="/404.png" />
  }
  const lessonSubmissions: SubmissionData[] = data
    ? data.submissions.filter(
        (submission: SubmissionData) =>
          submission.status !== 'passed' && submission.status !== 'needMoreWork'
      )
    : []
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
            <SubmissionDisplay submissions={lessonSubmissions} />
          )}
        </div>
      </Layout>
    </div>
  )
}

export default withQueryLoader<AppData>(
  {
    query: GET_APP
  },
  Review
)
