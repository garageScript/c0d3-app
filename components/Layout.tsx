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
  const user = _.get(session, 'user', null)

  if (user && user.username) {
    return (
      <>
        <AppNav username={user.username} loggedIn />
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
