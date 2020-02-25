import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import Card from '../components/Card'

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
      .map((e: Lesson) => (
        <Card key={e.id} title={e.title}>
          <p>{e.challenges.length} Challenges</p>
          <p>{e.description}</p>
        </Card>
      ))

    return (
      <Layout>
        <>
          {sortedLessons}
          <Card title="Progress"></Card>
          <Card title="General Announcements"></Card>
        </>
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
