import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import Layout from '../components/Layout'
import { GET_LESSONS } from '../graphql/queries'

const Course: React.FC = () => {
  const { data } = useQuery(GET_LESSONS)

  if (data) {
    const { lessons } = data
    return (
      <Layout>
        <>
          <h2>Courses</h2>
          <ul>
            {lessons.map((e: any) => (
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
