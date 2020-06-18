import * as React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import withQueryLoader, { WithQueryProps } from '../containers/withQueryLoader'
import { GET_APP } from '../graphql/queries'
import { useRouter } from 'next/router'
import _ from 'lodash'

const IndexPage: React.FC<WithQueryProps> = ({ queryData }) => {
  const router = useRouter()

  const { session } = queryData

  if (session && session.user) {
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

export default withQueryLoader(
  {
    query: GET_APP
  },
  IndexPage
)
