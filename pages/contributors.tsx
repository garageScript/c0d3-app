import * as React from 'react'
import _ from 'lodash'
import contributors from '../contributors'
import Layout from '../components/Layout'
import ContributorCard from '../components/ContributorCard'

export const Contributors = () => {
  const userData = contributors.map(user => {
    return (
      <div key={_.uniqueId()} className="col-4">
        <ContributorCard user={user} />
      </div>
    )
  })
  return (
    <Layout title="Contributors">
      <div className="row mt-4">{userData}</div>
    </Layout>
  )
}

export default Contributors
