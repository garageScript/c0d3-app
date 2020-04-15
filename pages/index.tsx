import * as React from 'react'
import Curriculum from './curriculum'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import useSession from '../helpers/useSession'

const IndexPage: any = () => {
  const { data, error } = useSession()

  // while loading, don't show anything to user
  if (!data && !error) {
    return null
  }

  if (data && data.userInfo) {
    return <Curriculum />
  }

  return (
    <>
      <AppNav loggedIn={false} />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default IndexPage
