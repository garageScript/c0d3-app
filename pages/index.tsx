import * as React from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import SessionContext from '../helpers/contexts/session'

const IndexPage: React.FC = () => {
  const router = useRouter()
  const { session } = React.useContext(SessionContext)
  const username = _.get(session, 'user.username')

  if (username) {
    router.push('/curriculum')
    return null
  }

  if (session)
    return (
      <>
        <AppNav loggedIn={false} />
        <LandingPage />
        <Footer footerType="py-5 bg-white text-muted" />
      </>
    )

  // React Testing Library needs to return null when there's no session otherwise it throws an error.
  return null
}

export default IndexPage
