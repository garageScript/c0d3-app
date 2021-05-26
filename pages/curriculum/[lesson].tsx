import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Error, { StatusCode } from '../../components/Error'
import LessonTitleCard from '../../components/LessonTitleCard'
import AlertsDisplay from '../../components/AlertsDisplay'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import GET_APP from '../../graphql/queries/getApp'
import {
  Challenge,
  UserLesson,
  Submission,
  GetAppQuery
} from '../../graphql/index'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import _ from 'lodash'

const Challenges: React.FC<QueryDataProps<GetAppQuery>> = ({ queryData }) => {
  const { lessons, session, alerts } = queryData
  const [show, setShow] = useState(false)
  const router = useRouter()
  const currentlessonId = Number(router.query.lesson)
  if (!lessons || !alerts) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }
  const currentLesson = lessons.find(lesson => lesson.id === currentlessonId)
  if (!currentLesson) {
    return <Error code={StatusCode.NOT_FOUND} message="Lesson not found" />
  }
  const userSubmissions: Submission[] =
    (_.get(session, 'submissions', []) as Submission[]) || []
  const lessonStatus: UserLesson[] = _.get(
    session,
    'lessonStatus',
    []
  ) as UserLesson[]

  const currentLessonStatus: UserLesson =
    lessonStatus.find(
      lessonStatus => lessonStatus.lessonId! === currentlessonId
    ) ||
    ({
      isEnrolled: null,
      isTeaching: null,
      lessonId: currentlessonId
    } as UserLesson)
  const isPassed = !!currentLessonStatus.isTeaching
  return (
    <div>
      <Layout title={`${currentLesson.title}`}>
        <div className="row mt-4">
          {currentLesson && (
            <div className="challenges-container">
              <LessonTitleCard
                lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
                lessonUrl={currentLesson.docUrl!}
                lessonTitle={currentLesson.title!}
                lessonId={currentlessonId}
                isPassed={isPassed}
                setShow={setShow}
                show={show}
              />
              {/* Casting alerts as any until type is migrated */}
              {alerts && <AlertsDisplay alerts={alerts as any} />}
              <ChallengeMaterial
                challenges={currentLesson.challenges as Challenge[]}
                userSubmissions={userSubmissions}
                lessonStatus={currentLessonStatus}
                lessonId={currentLesson.id}
                chatUrl={currentLesson.chatUrl!}
                show={show}
                setShow={setShow}
                session={session}
              />
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default withQueryLoader<GetAppQuery>(
  {
    query: GET_APP
  },
  Challenges
)
