import * as React from 'react'
import { storiesOf } from '@storybook/react'
import AppNav from '../components/AppNav'
import '../styles/tailwind.css'

storiesOf('Navbar', module).add('no login', () => {
  return <AppNav />
})
