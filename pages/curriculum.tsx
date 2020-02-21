import withApollo from '../utils/withApollo'
import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import Layout from '../components/Layout'
import { GET_JOBS } from '../graphql/queries'

const Course: React.FC = () => {
  const { data } = useQuery(GET_JOBS)

  if (data) {
    const { jobs } = data
    return (
      <Layout>
        <>
          <h2>Courses</h2>
          <ul>
            {jobs.map((e: any) => (
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
