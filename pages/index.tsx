import * as React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import LoadingSpinner from '../components/LoadingSpinner'
const IndexPage: React.FC<{}> = () => {
  const router = useRouter()
  if (process.browser && window.localStorage.getItem('loggedIn')) {
    router.push('/curriculum')
    return <LoadingSpinner />
  }
  return (
    <>
      <AppNav />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default IndexPage
