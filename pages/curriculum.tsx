import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import LessonCard from '../components/LessonCard'
import ProgressCard from '../components/ProgressCard'
import AnnouncementCard from '../components/AnnouncementCard'

import { GET_LESSONS } from '../graphql/queries'
type Challenge = {
  id: number
}

type Lesson = {
  id: number
  title: string
  description: string
  order: number
  challenges: Challenge[]
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
    const { lessons }: { lessons: Lesson[] } = data
    const sortedLessons: React.ReactElement[] = lessons
      .sort((a, b) => a.order - b.order)
      .map((e, idx) => (
        <LessonCard
          key={e.id}
          coverImg={`js-${idx}-cover.svg`}
          title={e.title}
          lessonCount={10}
          challengeCount={e.challenges.length}
          hourCount="-"
          description={e.description}
        ></LessonCard>
      ))
    return (
      <Layout>
        <div className="row mt-4">
          <div className="col-8">{sortedLessons}</div>
          <div className="col-4">
            <ProgressCard progressCount={0} />
            <AnnouncementCard
              announcementOne={announcementOne}
              announcementTwo={announcementTwo}
              announcementThree={announcementThree}
              announcementFour={announcementFour}
            />
          </div>
        </div>
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
