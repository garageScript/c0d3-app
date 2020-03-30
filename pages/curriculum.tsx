import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import AnnouncementCard from '../components/AnnouncementCard'
import AdditionalResources from '../components/AdditionalResources'

import { GET_LESSONS } from '../graphql/queries'
type Challenge = {
  id: number
}

type LessonStatus = {
  isEnrolled: string | null
  isPassed?: string
  isTeaching: string | null
}

type User = {
  userLesson: LessonStatus
}

type Lesson = {
  id: number
  title: string
  description: string
  order: number
  challenges: Challenge[]
  currentUser: User
  docUrl: string
}

const Curriculum: React.FC = () => {
  const { loading, data } = useQuery(GET_LESSONS)
  if (loading) {
    return <h1>Loading</h1>
  }

  const announcementOne =
    'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.'

  const announcementTwo =
    'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.'

  const announcementThree =
    'This lesson will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.'

  const announcementFour =
    'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be technically ready to contribute to our codebase.'

  if (data) {
    const { curriculumStatus }: { curriculumStatus: Lesson[] } = data
    const sortedLessons: Lesson[] = curriculumStatus.sort(
      (a, b) => a.order - b.order
    )
    const lessonInProgressIdx = sortedLessons.findIndex(
      lesson => !lesson.currentUser.userLesson.isPassed
    )
    const lessonsToRender: React.ReactElement[] = sortedLessons.map(
      (e, idx) => {
        let lessonState = ''
        if (
          e.currentUser.userLesson.isEnrolled ||
          idx === lessonInProgressIdx
        ) {
          lessonState = 'inProgress'
        }
        if (e.currentUser.userLesson.isPassed) {
          lessonState = 'completed'
        }
        return (
          <LessonCard
            key={e.id}
            coverImg={`js-${idx}-cover.svg`}
            title={e.title}
            challengeCount={e.challenges.length}
            description={e.description}
            currentState={lessonState}
            reviewUrl={`https://c0d3.com/teacher/${e.id}`}
            docUrl={e.docUrl}
          />
        )
      }
    )
    return (
      <Layout>
        <div className="row mt-4">
          <div className="col-8">{lessonsToRender}</div>
          <div className="col-4">
            <ProgressCard progressCount={0} />
            <AnnouncementCard
              announcementOne={announcementOne}
              announcementTwo={announcementTwo}
              announcementThree={announcementThree}
              announcementFour={announcementFour}
            />
            <AdditionalResources />
          </div>
        </div>
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
