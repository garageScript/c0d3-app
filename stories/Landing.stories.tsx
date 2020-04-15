jest.mock('next/router')
import * as React from 'react'
import LandingNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
const { useRouter } = jest.requireMock('next/router')

export default {
  title: 'Pages/landing'
}

export const Landing: React.FC = () => {
  useRouter.mockReturnValue({
    route: null
  })

  return (
    <>
      <LandingNav />
      <LandingPage />
      <Footer />
    </>
  )
}
