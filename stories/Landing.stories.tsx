import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LandingNav from '../components/LandingNav'
import '../scss/index.scss'
import LandingHero from '../components/LandingHero'
import LandingWhy from '../components/LandingWhy'

storiesOf('Landing Page', module)
  .add('nav', () => {
    return <LandingNav />
  })
  .add('hero', () => {
    return (
      <div className="container text-center">
        <LandingHero />
      </div>
    )
  })
  .add('why', () => {
    return (
      <div className="container text-center">
        <LandingWhy />
      </div>
    )
  })
