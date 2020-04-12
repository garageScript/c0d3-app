import * as React from 'react'
import AppNavBar from '../../components/AppNav'

export default {
  component: AppNavBar,
  title: 'Components/AppNavBar'
}

export const LoggedOut: React.FC = () => {
  return <AppNavBar />
}

export const LoggedIn: React.FC = () => {
  return <AppNavBar />
}
