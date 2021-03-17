import * as React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
const IndexPage: React.FC<{}> = () => {
  const router = useRouter()
  React.useEffect(() => {
    if (document.cookie.split('; ').find(row => row.startsWith('loggedIn=')))
      router.push('/curriculum')
  }, [])
  return (
    <>
      <AppNav />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default IndexPage
