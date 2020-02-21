import * as React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const Login: React.FC = () => {
  // our query that defines the attributes we want to get.
  const JOBS_QUERY = gql`
    query {
      jobs {
        id
        title
        applyUrl
        company {
          name
        }
      }
    }
  `

  // the hook that calls the query.
  const {loading, error, data} = useQuery(JOBS_QUERY)
	if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>Error...</h1>
  }

  const allJobs = data.jobs.map((e: any) => {
    return <h2>{e.title}</h2>
  })

	return (
		<Layout>
		<Card title="Login">
    {allJobs}
    </Card>
    </Layout>
  )
}

export default Login
