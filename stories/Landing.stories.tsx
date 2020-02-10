import * as React from 'react'
import LandingNav from '../components/LandingNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import '../scss/index.scss'

export default {
  title: 'Landing Page'
}

export const Page: React.FC = () => (
  <>
    <LandingNav />
    <LandingPage />
    <Footer />
  </>
)

export const landingNav: React.FC = () => <LandingNav />
export const landingPage: React.FC = () => <LandingPage />
export const footer: React.FC = () => <Footer />
