import * as React from 'react'
import Curriculum from './curriculum'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import useSWR from 'swr'

const SERVER_URL = process.env.SERVER_URL

export const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then(r => r.json())

const IndexPage: any = () => {
  const { data, error } = useSWR(`${SERVER_URL}/session`, fetcher)
  if (data && data.userInfo) {
    return <Curriculum />
  }
  // while loading, don't show anything to user
  if (!data && !error) {
    return ''
  }
  return (
    <>
      <AppNav loggedIn={false} />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}

export default IndexPage
