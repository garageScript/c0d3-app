import * as React from 'react'
import LandingNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'

export default {
  title: 'Pages/landing'
}

export const Landing: React.FC = () => (
  <>
    <LandingNav loggedIn={false} />
    <LandingPage />
    <Footer />
  </>
)
