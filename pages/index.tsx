import React from 'react'
import AppNav from '../components/AppNav'
import LandingPage from '../components/LandingPage'
import Footer from '../components/Footer'
import { GetServerSideProps } from 'next'
const IndexPage: React.FC<{}> = () => {
  return (
    <>
      <AppNav />
      <LandingPage />
      <Footer footerType="py-5 bg-white text-muted" />
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  return context.req.cookies['connect.sid']
    ? {
        redirect: {
          destination: '/curriculum',
          permanent: false
        }
      }
    : {
        props: {}
      }
}

export default IndexPage
