import React from 'react'
import AppNav from './AppNav'
import Footer from './Footer'
import SessionContext from '../helpers/contexts/session'
import _ from 'lodash'

type Props = {
  children: React.ReactElement
}

const Layout: React.FC<Props> = ({ children }) => {
  const { session } = React.useContext(SessionContext)

  if (session && session.user) {
    return (
      <>
        <AppNav username={session.user.username} loggedIn />
        <div className="container">{children}</div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <AppNav />
      <div className="container">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
