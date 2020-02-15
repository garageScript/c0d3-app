import React from 'react'
import AppNav from './AppNav'
import Footer from './Footer'

type Props = {
  children: React.ReactElement
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <AppNav loggedIn={false} />
      <div className="container">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
