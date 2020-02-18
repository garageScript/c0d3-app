import * as React from 'react'
import LandingNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import '../scss/index.scss'

export default {
  title: 'Landing Page'
}

export const Page: React.FC = () => (
  <>
    <LandingNav loggedIn={false} />
    <LandingPage />
    <Footer />
  </>
)

export const landingNav: React.FC = () => <LandingNav loggedIn={false} />
export const landingPage: React.FC = () => <LandingPage />
export const footer: React.FC = () => <Footer />
