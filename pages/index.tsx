import * as React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import { withGetApp, GetAppProps } from '../graphql'
import { useRouter } from 'next/router'
import _ from 'lodash'

const IndexPage: React.FC<GetAppProps> = ({ data: { loading, session } }) => {
  const router = useRouter()

  if (loading) return <LoadingSpinner />
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

export default withGetApp()(IndexPage)
