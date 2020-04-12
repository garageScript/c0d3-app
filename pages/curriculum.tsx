import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import AnnouncementCard from '../components/AnnouncementCard'
import AdditionalResources from '../components/AdditionalResources'
import { Lesson } from '../@types/lesson'
import { GET_LESSONS } from '../graphql/queries'

const Curriculum: React.FC = () => {
  const { loading, data } = useQuery(GET_LESSONS)
  let lessonsToRender: React.ReactElement[]
  if (loading) {
    return <h1>Loading</h1>
  }
  if (!data) {
    lessonsToRender = [<h1 key={0}>No lessons at this time...</h1>]
  } else {
    const { curriculumStatus }: { curriculumStatus: Lesson[] } = data
    const sortedLessons: Lesson[] = curriculumStatus.sort(
      (a, b) => a.order - b.order
    )
    const lessonInProgressIdx = sortedLessons.findIndex(
      lesson => !lesson.currentUser.userLesson.isPassed
    )
    lessonsToRender = sortedLessons.map((lesson, idx) => {
      let lessonState = ''
      if (
        lesson.currentUser.userLesson.isEnrolled ||
        idx === lessonInProgressIdx
      ) {
        lessonState = 'inProgress'
      }
      if (lesson.currentUser.userLesson.isPassed) {
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
          reviewUrl={`https://c0d3.com/teacher/${lesson.id}`}
          challengesUrl={`https://c0d3.com/student/${lesson.id}`}
          docUrl={lesson.docUrl}
        />
      )
    })
  }
  const announcements = [
    'To make space for other students on our servers, your account will be deleted after 30 days of inactivity.',
    'Take each lesson challenge seriously and do them over and over again until you can solve them. With the exception End to End, all challenges are questions and exercises taken from real interviews.',
    'This lesson will not only prepare you for interviews, but it will also help teach you the skills that you need to become an effective engineer.',
    'After completing Foundations of JavaScript, Variables & Functions, Array, Objects, End to End, HTML/CSS/JavaScript, React/GraphQL/SocketIO, you will be technically ready to contribute to our codebase.'
  ]
  return (
    <Layout>
      <div className="row mt-4">
        <div className="col-8">{lessonsToRender}</div>
        <div className="col-4">
          <ProgressCard progressCount={0} />
          <AnnouncementCard announcements={announcements} />
          <AdditionalResources />
        </div>
      </div>
    </Layout>
  )
}

export default Curriculum
