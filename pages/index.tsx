import * as React from 'react'
import { useRouter } from 'next/router'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import SessionContext from '../helpers/contexts/session'

const IndexPage: any = () => {
  const router = useRouter()
  const { data } = React.useContext(SessionContext)

  // while loading, don't show anything to user
  if (!data.errorMessage && !data.userInfo) {
    return null
  }

  // Route to curriculum is user is found
  if (data.userInfo) {
    router.push('/curriculum')
    return null
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
