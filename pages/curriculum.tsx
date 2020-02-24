import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Layout from '../components/Layout'
import Card from '../components/Card'

import { GET_LESSONS } from '../graphql/queries'

const Curriculum = () => {
  const { loading, data } = useQuery(GET_LESSONS)
  if (loading) {
    return <h1>Loading</h1>
  }

  if (data) {
    const { lessons } = data
    console.log(lessons)

    return (
      <Layout>
        {lessons
          .sort((a: any, b: any) => a.order - b.order)
          .map((lesson: any) => {
            return (
              <Card key={lesson.id} title={lesson.title}>
                <p>{lesson.challenges.length} Challenges</p>
                <p>{lesson.description}</p>
              </Card>
            )
          })}
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
