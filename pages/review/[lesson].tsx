import { useQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Title from '../../components/Layout'
import { getLayout } from '../../components/getLayout'

import ReviewCard from '../../components/ReviewCard'
import LessonTitleCard from '../../components/LessonTitleCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import GET_APP from '../../graphql/queries/getApp'
import GET_SUBMISSIONS from '../../graphql/queries/getSubmissions'
import { GetAppQuery, Submission } from '../../graphql/index'
import Error, { StatusCode } from '../../components/Error'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import _ from 'lodash'
import { SubmissionStatus } from '../../graphql'
import { GlobalContext } from '../../helpers/globalContext'
import Title from '../../components/Title'

type SubmissionDisplayProps = {
  submissions: Submission[]
}

const SubmissionDisplay: React.FC<SubmissionDisplayProps> = ({
  submissions
}) => (
  <div className="submissions-container container p-0">
    {submissions.map(submission => (
      <ReviewCard key={submission.id} submissionData={submission} />
    ))}
  </div>
)

const Review: React.FC<QueryDataProps<GetAppQuery>> = ({ queryData }) => {
  const { lessons, session } = queryData
  const router = useRouter()
  const context = useContext(GlobalContext)
  const currentlessonId = Number(router.query.lesson)
  useEffect(() => {
    session && context.setContext(session)
  }, [session])
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
  const currentLesson = lessons.find(lesson => lesson.id === currentlessonId)
  if (!currentLesson) {
    return <Error code={StatusCode.NOT_FOUND} message="Page not found" />
  }
  if (
    !session.lessonStatus.find(status => {
      return status.lessonId === currentLesson.id && status.isPassed
    })
  ) {
    router.push('/curriculum')
    return <LoadingSpinner />
  }
  const lessonSubmissions: Submission[] = data
    ? data.submissions.filter(
        (submission: Submission) =>
          submission.status !== SubmissionStatus.Passed &&
          submission.status !== SubmissionStatus.NeedMoreWork
      )
    : []
  return (
    <>
      <Title title={`Review - ${currentLesson.title}`} />
      <div className="row mt-4">
        <LessonTitleCard
          lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
          lessonUrl={currentLesson.docUrl!}
          lessonTitle={currentLesson.title!}
          lessonId={currentlessonId}
          isPassed={true}
        />
        {currentLesson && <SubmissionDisplay submissions={lessonSubmissions} />}
      </div>
    </>
  )
}

export default withQueryLoader<GetAppQuery>(
  {
    query: GET_APP
  },
  Review
)
