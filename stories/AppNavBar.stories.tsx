import * as React from 'react'
import AppNavBar from '../components/AppNav'
import '../scss/index.scss'

export default {
  component: AppNavBar,
  title: 'App NavBar'
}

export const loggedOut: React.FC = () => <AppNavBar loggedIn={false} />

export const loggedIn: React.FC = () => (
  <AppNavBar
    firstName="Herman"
    lastName="Wong"
    username="hwong0305"
    loggedIn={true}
  />
)
