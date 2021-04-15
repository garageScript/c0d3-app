import React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
const IndexPage: React.FC<{}> = () => {
  const router = useRouter()
  const isLoggedIn =
    typeof window !== 'undefined' && window.localStorage.getItem('loggedIn')
  isLoggedIn && router.push('/curriculum')
  return (
    <>
      <AppNav />
      {!isLoggedIn && (
        <>
          <LandingPage />
          <Footer footerType="py-5 bg-white text-muted" />
        </>
      )}
    </>
  )
}
export default IndexPage
