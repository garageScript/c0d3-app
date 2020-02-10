import React from 'react'
import LandingNav from './LandingNav'
import Footer from './Footer'

type Props = {
  children: React.ReactElement
}

const Layout: React.FC<Props> = props => {
  return (
    <>
      <LandingNav />
      <div className="container">{props.children}</div>
      <Footer />
    </>
  )
}

export default Layout
