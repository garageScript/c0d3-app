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
    return (
      <Layout>
        <Card title="Curriculum">
          <ul>
            {lessons.map((e: any) => (
              <li key={e.id}>{e.title}</li>
            ))}
          </ul>
        </Card>
      </Layout>
    )
  }

  return <h1>...</h1>
}

export default Curriculum
