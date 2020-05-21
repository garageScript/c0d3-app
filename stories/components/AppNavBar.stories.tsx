import * as React from 'react'
import AppNavBar from '../../components/AppNav'

export default {
  component: AppNavBar,
  title: 'Components/AppNavBar'
}

export const LoggedOut: React.FC = () => <AppNavBar loggedIn={false} />

//TODO Storybook should focus on UI only. Currently AppNavBar is using a mutation Query when logged in which is causing test to fail.
/*
export const LoggedIn: React.FC = () => (
  <AppNavBar
    firstName="Herman"
    lastName="Wong"
    username="hwong0305"
    loggedIn={true}
  />
)*/
