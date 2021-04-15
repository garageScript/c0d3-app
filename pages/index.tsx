import React, { useEffect, useState } from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
const IndexPage: React.FC<{}> = () => {
  const router = useRouter()
  const [status, setStatus] = useState(false)
  useEffect(() => {
    window.localStorage.getItem('loggedIn')
      ? router.push('/curriculum')
      : setStatus(true)
  }, [])
  return (
    <>
      <AppNav />
      {status && (
        <>
          <LandingPage />
          <Footer footerType="py-5 bg-white text-muted" />
        </>
      )}
    </>
  )
}
export default IndexPage
