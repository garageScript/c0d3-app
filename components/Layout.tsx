import React from 'react'
import AppNav from './AppNav'
import Footer from './Footer'
import SessionContext from '../helpers/contexts/session'

type Props = {
  children: React.ReactElement
}

const Layout: React.FC<Props> = ({ children }) => {
  const { data } = React.useContext(SessionContext)

  if (data && data.userInfo) {
    return (
      <>
        <AppNav username={data.userInfo.username} loggedIn />
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
