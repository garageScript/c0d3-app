import * as React from 'react'
import LandingNav from '../components/LandingNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'

const IndexPage: React.FC = () => {
  return (
    <>
      <LandingNav />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default IndexPage
