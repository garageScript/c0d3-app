import React from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import Layout from '../Layout'
import _ from 'lodash'
import { GetAppProps } from '../../graphql'
import Error, { StatusCode } from '../../components/Error'
import { useRouter } from 'next/router'
export const AdminLayout: React.FC<GetAppProps & { title?: string }> = ({
  data,
  children
}) => {
  const router = useRouter()
  const { loading, error, session } = data

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <Error code={StatusCode.INTERNAL_SERVER_ERROR} />
  }

  if (!session) router.push('/login')

  const isAdmin = _.get(session, 'user.isAdmin', false) as boolean

  if (!isAdmin) {
    return <Error code={StatusCode.FORBIDDEN} />
  }

  return <Layout>{children}</Layout>
}
