import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Error from '../../components/Error'
import LessonTitleCard from '../../components/LessonTitleCard'
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
  if (!session || !lessons || !alerts) {
    return (
      <Error title="Internal server error" message="Bad data" src="/500.png" />
    )
  }
  if (!lessons.find((lesson: Lesson) => lesson.id === currentlessonId)) {
    return <Error title="404 error" message="Page not found" src="/404.png" />
  }
  const userSubmissions: UserSubmission[] = _.get(session, 'submissions', [])
  const lessonStatus: LessonStatus[] = _.get(session, 'lessonStatus', [])
  const currentLesson: Lesson | undefined = lessons.find(
    (lesson: Lesson) => lesson.id === currentlessonId
  )
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
