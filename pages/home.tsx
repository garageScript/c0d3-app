import * as React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'

const Home: React.FC = () => (
  <>
    <AppNav />
    <LandingPage />
    <Footer footerType="py-5 bg-white text-muted" />
  </>
)

export default Home
