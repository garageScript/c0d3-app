import * as React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout'
import ContributorCard from '../components/ContributorCard'

export const Contributors = () => {
  // Add an object with your information in the contributors array below to generate a ContributorCard
  const contributors = [
    {
      firstName: 'Alexis',
      lastName: 'Ortiz Ojeda',
      username: 'aortizoj',
      linkedinUrl: 'https://www.linkedin.com/in/alexis-ortiz-ojeda/',
      githubPRsUrl:
        'https://github.com/garageScript/c0d3-app/pulls?q=is%3Apr+author%3Aaortizoj15',
      codeSample: 'https://github.com/garageScript/c0d3-app/pull/67',
      resume:
        'https://drive.google.com/file/d/1HoMg9QHGH2qicG8bZ8hRWv7FT7GXjFB5/view'
    }
  ]
  const userData = contributors.map(user => {
    return (
      <div key={_.uniqueId()} className="col-4">
        <ContributorCard user={user} />
      </div>
    )
  })
  return (
    <Layout>
      <div className="row mt-4">{userData}</div>
    </Layout>
  )
}

export default Contributors
