import * as React from 'react'
import _ from 'lodash'
import contributors from '../contributors'
import { getLayout } from '../components/Layout'
import ContributorCard from '../components/ContributorCard'
import Title from '../components/Title'
import { WithLayout } from '../@types/page'
export const Contributors: React.FC & WithLayout = () => {
  const userData = contributors.map(user => {
    return (
      <div key={_.uniqueId()} className="col-4">
        <ContributorCard user={user} />
      </div>
    )
  })
  return (
    <>
      <Title title="Contributors" />
      <div className="row mt-4">{userData}</div>
    </>
  )
}

Contributors.getLayout = getLayout

export default Contributors
