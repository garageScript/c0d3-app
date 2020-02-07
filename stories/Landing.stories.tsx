import * as React from 'react'
import { storiesOf } from '@storybook/react'
import LandingNav from '../components/LandingNav'
import LandingPage from '../components/LandingPage'
import '../scss/index.scss'

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
