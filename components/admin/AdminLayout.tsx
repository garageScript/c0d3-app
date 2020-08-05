import React from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import Layout from '../../components/Layout'
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

  if (!session) window.location.href = '/login'

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
