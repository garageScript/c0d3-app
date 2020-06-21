import * as React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import withQueryLoader, { QueryDataProps } from '../containers/withQueryLoader'
import GET_APP from '../graphql/queries/getApp'
import { useRouter } from 'next/router'
import { AppData } from '../@types/app'
import _ from 'lodash'

const IndexPage: React.FC<QueryDataProps<AppData>> = ({ queryData }) => {
  const router = useRouter()
  const { session } = queryData

  if (session) {
    router.push('/curriculum')
    return null
  }

  return (
    <>
      <AppNav />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default withQueryLoader<AppData>(
  {
    query: GET_APP
  },
  IndexPage
)
