import React, { ReactElement, ReactNode } from 'react'
import AppNav from './AppNav'
import Footer from './Footer'

const Layout: React.FC = ({ children }) => (
  <>
    <AppNav />
    <div className="container-md">{children}</div>
    <Footer />
  </>
)

export const getLayout = (page: ReactElement): ReactNode => (
  <Layout>{page}</Layout>
)
export default Layout
