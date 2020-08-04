import React from 'react'
// import { useQuery } from '@apollo/react-hooks'
import LoadingSpinner from '../../components/LoadingSpinner'
import Layout from '../../components/Layout'
// import getApp from '../../graphql/queries/getApp'
import _ from 'lodash'
import { GetAppProps } from '../../graphql'

export const AdminLayout: React.FC<GetAppProps> = ({ data, children }) => {
  const { loading, error, session } = data
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Layout>
        <h1>Error</h1>
      </Layout>
    )
  }

  const isAdmin = _.get(session, 'user.isAdmin', false)

  if (isAdmin !== 'true') {
    return (
      <Layout>
        <h1>You must be admin to access this page</h1>
      </Layout>
    )
  }

  return <Layout>{children}</Layout>
}
