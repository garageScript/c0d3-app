import * as React from 'react'
import Layout from '../components/Layout'
import Error, { StatusCode } from '../components/Error'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import AnnouncementCard from '../components/AnnouncementCard'
import AdditionalResources from '../components/AdditionalResources'
import AlertsDisplay from '../components/AlertsDisplay'
import LoadingSpinner from '../components/LoadingSpinner'
import { useGetAppQuery, GetAppQuery } from '../graphql/'
import DiscordBar from '../components/DiscordBar'
import _ from 'lodash'

const announcements = [
  'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.',
  'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.',
  'These lessons will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.',
  'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be ready to contribute to our codebase.'
]

export const Curriculum: React.FC<{}> = () => {
  const { loading, error, data } = useGetAppQuery()
  if (loading) return <LoadingSpinner />
  if (error) {
    return (
      <Error code={StatusCode.INTERNAL_SERVER_ERROR} message={error.message} />
    )
  }
  const { alerts, lessons, session } = data as GetAppQuery
  if (!lessons || !alerts) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} message="Bad data" />
  }
  const { lessonStatus } = session || { lessonStatus: [] }
  const lessonStatusMap: { [id: string]: typeof lessonStatus[0] } = {}
  for (const status of lessonStatus) {
    const lessonId = _.get(status, 'lessonId', '-1') as string
    lessonStatusMap[lessonId] = status
  }

  const lessonInProgressIdx = _.cond([
    [_.isEqual.bind(null, -1), _.constant(0)],
    [_.constant(true), (output: number) => output]
  ])(
    lessons.findIndex(lesson => {
      const lessonId = _.get(lesson, 'id', '-1') as string
      const passed = _.get(lessonStatusMap[lessonId], 'isPassed', false)
      return !passed
    })
  )

  // Progress Percentage should be calculated from lessons 0-6 because thats our current standard of finishing the curriculum.
  const TOTAL_LESSONS = 7
  const progressPercentage = Math.floor(
    (lessonInProgressIdx * 100) / TOTAL_LESSONS
  )
  const lessonsToRender: React.ReactElement[] = lessons.map((lesson, idx) => {
    const id = _.get(lesson, 'id', idx) as number
    const status = lessonStatusMap[id]
    let lessonState = ''
    if (idx === lessonInProgressIdx) {
      lessonState = 'inProgress'
    }
    const passed = _.get(status, 'isPassed', false)
    if (passed) {
      lessonState = 'completed'
    }
    const title = _.get(lesson, 'title', '') as string
    const challengeCount = _.get(lesson, 'challenges.length', 0) as number
    const description = _.get(lesson, 'description', '') as string
    return (
      <LessonCard
        key={id}
        lessonId={id}
        coverImg={`js-${idx}-cover.svg`}
        title={title}
        challengeCount={challengeCount}
        description={description}
        currentState={lessonState}
        reviewUrl={`/review/${id}`}
        challengesUrl={`/curriculum/${id}`}
        docUrl={_.get(lesson, 'docUrl', '') as string}
      />
    )
  })
  return (
    <Layout>
      <div className="row">
        <AlertsDisplay alerts={alerts} page="curriculum" />
        <div className="col-xl-8 order-xl-0 order-1">{lessonsToRender}</div>
        <div className="col-xl-4">
          <div className="d-xl-block">
            <DiscordBar />
            <ProgressCard progressCount={progressPercentage} />
          </div>
          <div className="d-none d-xl-block">
            <AnnouncementCard announcements={announcements} />
            <AdditionalResources />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Curriculum
