import * as React from 'react'
import LandingNav from '../components/LandingNav'
import LandingHero from '../components/LandingHero'
import LandingWhy from '../components/LandingWhy'

const IndexPage: React.FC = () => {
  return (
    <div>
      <LandingNav />
      <div className="container text-center">
        <LandingHero />
        <LandingWhy />
      </div>
    </div>
  )
}

export default IndexPage
