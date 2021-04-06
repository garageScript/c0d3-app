import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Error, { StatusCode } from '../../components/Error'
import LessonTitleCard from '../../components/LessonTitleCard'
import AlertsDisplay from '../../components/AlertsDisplay'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import GET_APP from '../../graphql/queries/getApp'
import {
  Challenge,
  Lesson,
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
  const router = useRouter()
  const currentlessonId = Number(router.query.lesson) as number
  if (!lessons || !alerts) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }
  const currentLesson: Lesson | undefined = lessons.find(
    lesson => lesson.id === currentlessonId
  ) as Lesson
  if (!currentLesson) {
    return <Error code={StatusCode.NOT_FOUND} message="Lesson not found" />
  }
  const userSubmissions: Submission[] = _.get(
    session,
    'submissions',
    []
  ) as Submission[]
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
      <Layout>
        <div className="row mt-4">
          {currentLesson && (
            <div className="challenges-container">
              <LessonTitleCard
                lessonCoverUrl={`js-${currentLesson.order}-cover.svg`}
                lessonUrl={currentLesson.docUrl!}
                lessonTitle={currentLesson.title!}
                lessonId={currentlessonId}
                isPassed={isPassed}
              />
              {/* Casting alerts as any until type is migrated */}
              {alerts && <AlertsDisplay alerts={alerts as any} />}
              <ChallengeMaterial
                challenges={currentLesson.challenges as Challenge[]}
                userSubmissions={userSubmissions}
                lessonStatus={currentLessonStatus}
                chatUrl={currentLesson.chatUrl!}
                lessonId={currentLesson.id}
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
