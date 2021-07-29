import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getLayout } from '../../components/Layout'
import Title from '../../components/Title'
import Error, { StatusCode } from '../../components/Error'
// import LessonTitleCard from '../../components/LessonTitleCard'
import AlertsDisplay from '../../components/AlertsDisplay'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import LoadingSpinner from '../../components/LoadingSpinner'
import {
  Challenge,
  UserLesson,
  Submission,
  useGetAppQuery
} from '../../graphql/index'
import _ from 'lodash'
import { GlobalContext } from '../../helpers/globalContext'
import { WithLayout } from '../../@types/page'

const Challenges: React.FC & WithLayout = () => {
  const {
    data: { lessons, session, alerts } = {},
    loading,
    error
  } = useGetAppQuery()
  const context = useContext(GlobalContext)
  useEffect(() => {
    session && context.setContext(session)
  }, [session])
  const [show, setShow] = useState(false)
  const router = useRouter()
  if (loading || !router.isReady) {
    return <LoadingSpinner />
  }
  if (error) {
    return (
      <Error code={StatusCode.INTERNAL_SERVER_ERROR} message={error.message} />
    )
  }
  const currentlessonId = Number(router.query.lesson)
  if (!lessons || !alerts)
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />

  const currentLesson = lessons.find(lesson => lesson.id === currentlessonId)
  if (!currentLesson)
    return <Error code={StatusCode.NOT_FOUND} message="Lesson not found" />

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
  // const isPassed = !!currentLessonStatus.isTeaching
  return (
    <>
      <Title title={`${currentLesson.title}`} />
      <div className="row mt-4">
        {currentLesson && (
          <div className="challenges-container">
            {/* <LessonTitleCard
              lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
              lessonUrl={currentLesson.docUrl!}
              lessonTitle={currentLesson.title!}
              lessonId={currentlessonId}
              isPassed={isPassed}
              setShow={setShow}
              show={show}
            /> */}
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
            />
          </div>
        )}
      </div>
    </>
  )
}

Challenges.getLayout = getLayout
export default Challenges
