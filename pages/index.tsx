import * as React from 'react'
import Curriculum from './curriculum'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import withQueryLoader, { WithQueryProps } from '../containers/withQueryLoader'
import { GET_APP } from '../graphql/queries'

const IndexPage: React.FC<WithQueryProps> = ({queryData}) => {
  const { session }: { session: any } = queryData

  if(session) {
    return <Curriculum />
  }

  return (
    <>
      <AppNav loggedIn={false} />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default withQueryLoader({
  query: GET_APP
},IndexPage)
