import * as React from 'react'
import Curriculum from './curriculum'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import SessionContext from '../helpers/contexts/session'

const IndexPage: React.FC = () => {
  const { session } = React.useContext(SessionContext)

  if (session) {
    return  <Curriculum />
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
