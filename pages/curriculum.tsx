import * as React from 'react'
import Layout from '../components/Layout'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import AnnouncementCard from '../components/AnnouncementCard'
import AdditionalResources from '../components/AdditionalResources'
import { Lesson, LessonStatus } from '../@types/lesson'
import { AppData } from '../@types/app'
import GET_APP from '../graphql/queries/getApp'
import withQueryLoader, { QueryDataProps } from '../containers/withQueryLoader'
import AlertsDisplay from '../components/AlertsDisplay'
import _ from 'lodash'

type LessonStatusMap = {
  [id: string]: LessonStatus
}

export const Curriculum: React.FC<QueryDataProps<AppData>> = ({
  queryData
}) => {
  const announcements = [
    'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.',
    'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.',
    'This lesson will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.',
    'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be technically ready to contribute to our codebase.'
  ]

  const { lessons, session, alerts } = queryData
  const lessonStatus: LessonStatus[] = _.get(session, 'lessonStatus', [])
  const lessonStatusMap: LessonStatusMap = lessonStatus.reduce(
    (map: LessonStatusMap, lessonStatus: LessonStatus) => {
      map[lessonStatus.lessonId] = lessonStatus
      return map
    },
    {}
  )

  const lessonsWithStatus: Lesson[] = lessons.map((lesson: Lesson) => {
    lesson.lessonStatus = lessonStatusMap[lesson.id] || {
      isEnrolled: null,
      isTeaching: null,
      lessonId: lesson.id
    }
    return lesson
  })

  const lessonInProgressIdx =
    lessonsWithStatus.findIndex(lesson => !lesson.lessonStatus.isPassed) || 0

  // Progress Percentage should be calculated from lessons 0-6 because thats our current standard of finishing the curriculum.
  const progressPercentage = Math.floor((lessonInProgressIdx * 100) / 7)
  const lessonsToRender: React.ReactElement[] = lessonsWithStatus.map(
    (lesson, idx) => {
      let lessonState = ''
      if (idx === lessonInProgressIdx) {
        lessonState = 'inProgress'
      }
      if (lesson.lessonStatus.isPassed) {
        lessonState = 'completed'
      }
      return (
        <LessonCard
          key={lesson.id}
          lessonId={lesson.id}
          coverImg={`js-${idx}-cover.svg`}
          title={lesson.title}
          challengeCount={lesson.challenges.length}
          description={lesson.description}
          currentState={lessonState}
          reviewUrl={`/review/${lesson.id}`}
          challengesUrl={`/curriculum/${lesson.id}`}
          docUrl={lesson.docUrl}
        />
      )
    }
  )
  return (
    <Layout>
      <div className="row">
        <AlertsDisplay alerts={alerts} page="curriculum" />
        <div className="col-8">{lessonsToRender}</div>
        <div className="col-4">
          <ProgressCard progressCount={progressPercentage} />
          <AnnouncementCard announcements={announcements} />
          <AdditionalResources />
        </div>
      </div>
    </Layout>
  )
}

export default withQueryLoader<AppData>(
  {
    query: GET_APP
  },
  Curriculum
)
