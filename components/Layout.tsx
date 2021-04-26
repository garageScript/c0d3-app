import React from 'react'
import AppNav from './AppNav'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => (
  <>
    <AppNav />
    <div className="container-md">{children}</div>
    <Footer />
  </>
)

export default Layout
