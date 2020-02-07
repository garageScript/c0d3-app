import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LandingNav from '../components/LandingNav'
import '../scss/index.scss'
import LandingPage from '../components/LandingPage'

storiesOf('Landing Page', module)
  .add('nav', () => {
    return <LandingNav />
  })
  .add('page', () => {
    return (
      <div className="container text-center">
        <LandingPage />
      </div>
    )
  })
