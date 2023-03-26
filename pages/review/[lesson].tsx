import { useQuery } from '@apollo/client'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
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
import Alert from '../../components/Alert'
import redirectUnauthenticated from '../../helpers/redirectUnauthenticated'

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
  const slug = router.query.lesson as string
  const currentLesson = lessons.find(lesson => lesson.slug === slug)

  useEffect(() => {
    redirectUnauthenticated(!session?.user)
    session && context.setContext(session)
  }, [session])

  const { loading, data } = useQuery(GET_SUBMISSIONS, {
    variables: { lessonId: currentLesson?.id },
    skip: !currentLesson
  })

  if (loading || !session?.user) {
    return <LoadingSpinner />
  }

  if (!currentLesson) {
    return <Error code={StatusCode.NOT_FOUND} message="Page not found" />
  }

  if (
    !session.lessonStatus.find(
      status => status.lessonId === currentLesson.id && status.passedAt
    )
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
    <div>
      <Layout title={`Review - ${currentLesson.title}`}>
        <div className="row mt-4">
          <LessonTitleCard
            lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
            lessonUrl={currentLesson.docUrl!}
            lessonTitle={currentLesson.title!}
            lessonId={currentLesson.id}
            lessonSlug={slug}
            isPassed={true}
          />
          {currentLesson &&
            (lessonSubmissions.length ? (
              <SubmissionDisplay submissions={lessonSubmissions} />
            ) : (
              <div className="p-0 mt-4">
                <Alert
                  alert={{
                    id: 0,
                    text: 'All the submissions were reviewed. Come and check later!',
                    type: 'info'
                  }}
                />
              </div>
            ))}
        </div>
      </Layout>
    </div>
  )
}

export default withQueryLoader<GetAppQuery>(
  {
    query: GET_APP,
    // prevents outdated session data that's read from the cache
    getParams: () => ({ ssr: false, fetchPolicy: 'network-only' })
  },
  Review
)
