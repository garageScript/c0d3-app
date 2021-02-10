import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Error, { StatusCode } from '../../components/Error'
import LessonTitleCard from '../../components/LessonTitleCard'
import LoadingSpinner from '../../components/LoadingSpinner'
import AlertsDisplay from '../../components/AlertsDisplay'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import GET_APP from '../../graphql/queries/getApp'
import { Lesson, LessonStatus } from '../../@types/lesson'
import { UserSubmission } from '../../@types/challenge'
import { AppData } from '../../@types/app'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import _ from 'lodash'

const Challenges: React.FC<QueryDataProps<AppData>> = ({ queryData }) => {
  const { lessons, session, alerts } = queryData
  const router = useRouter()
  const currentlessonId = router.query.lesson as string
  if (!session) {
    router.push('/login')
    return <LoadingSpinner />
  }
  if (!lessons || !alerts) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }
  const currentLesson: Lesson | undefined = lessons.find(
    (lesson: Lesson) => lesson.id === currentlessonId
  )
  if (!currentLesson) {
    return <Error code={StatusCode.NOT_FOUND} message="Lesson not found" />
  }
  const userSubmissions: UserSubmission[] = _.get(session, 'submissions', [])
  const lessonStatus: LessonStatus[] = _.get(session, 'lessonStatus', [])

  const currentLessonStatus: LessonStatus = lessonStatus.find(
    lessonStatus => lessonStatus.lessonId === currentlessonId
  ) || { isEnrolled: null, isTeaching: null, lessonId: currentlessonId }
  const isPassed = !!currentLessonStatus.isTeaching
  return (
    <div>
      <Layout>
        <div className="row mt-4">
          {currentLesson && (
            <div className="challenges-container">
              <LessonTitleCard
                lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
                lessonUrl={currentLesson.docUrl}
                lessonTitle={currentLesson.title}
                lessonId={currentlessonId}
                isPassed={isPassed}
              />
              {/* Casting alerts as any until type is migrated */}
              {alerts && <AlertsDisplay alerts={alerts as any} />}
              <ChallengeMaterial
                challenges={currentLesson.challenges}
                userSubmissions={userSubmissions}
                lessonStatus={currentLessonStatus}
                chatUrl={currentLesson.chatUrl}
                lessonId={currentLesson.id}
              />
            </div>
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
  Challenges
)
