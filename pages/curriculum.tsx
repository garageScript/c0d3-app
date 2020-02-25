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

const Curriculum: React.FC<any> = () => {
  const { loading, data } = useQuery(GET_LESSONS)
  if (loading) {
    return <h1>Loading</h1>
  }

  if (data) {
    const { lessons }: { lessons: Lesson[] } = data
    const sortedLessons: Lesson[] = lessons.sort((a, b) => {
      return a.order - b.order
    })

    return (
      <Layout>
        {sortedLessons.map((e: Lesson) => (
          <Card key={e.id} title={e.title}>
            <p>{e.challenges.length} Challenges</p>
            <p>{e.description}</p>
          </Card>
        ))}
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
