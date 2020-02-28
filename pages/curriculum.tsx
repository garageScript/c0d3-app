import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import LessonCard from '../components/LessonCard'

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
        <>
          <div className="row">
            <div className="cards-container col-9">{sortedLessons}</div>
            <div className="col-3"></div>
          </div>
        </>
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
