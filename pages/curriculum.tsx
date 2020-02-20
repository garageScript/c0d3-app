import withApollo from '../utils/withApollo'
import * as React from 'react'
import Layout from '../components/Layout'

import { useLessonQuery } from '../graphql/lesson.graphql'

type Lesson = {
  id: string
  title: string
}

const Course: React.FC = () => {
  const { data } = useLessonQuery()

  if (data) {
    const { lessons } = data as { lessons: Lesson[] }
    return (
      <Layout>
        <>
          <h2>Courses</h2>
          <ul>
            {lessons.map(e => (
              <li key={e.id}>
                <strong>{e.id}:</strong> {e.title}
              </li>
            ))}
          </ul>
        </>
      </Layout>
    )
  } else {
    return (
      <Layout>
        <p>Houston you have a problemmmmm</p>
      </Layout>
    )
  }
}

export default withApollo(Course)
