import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import LoadingSpinner from '../../components/LoadingSpinner'
import Layout from '../../components/Layout'
import { withGetApp, GetAppProps } from '../../graphql'
import allUsers from '../../graphql/queries/allUsers'
import _ from 'lodash'
import { UsersTable } from '../../components/admin/users/AdminUsersTable'
import { User } from '../../graphql/index'

type AdminUsersProps = {
  users: User[] | null
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>
}

const titleStyle: React.CSSProperties | undefined = {
  fontSize: '6rem',
  textAlign: 'center',
  fontWeight: 'bold'
}

const AdminUsers: React.FC<AdminUsersProps> = ({ users, setUsers }) => {
  return (
    <div className="d-flex flex-column col-12">
      <span className="text-primary" style={titleStyle}>
        Users
      </span>

      <UsersTable users={users} setUsers={setUsers} />
    </div>
  )
}

const LoadUsers: React.FC = () => {
  const { loading, error, data } = useQuery(allUsers)
  const [users, setUsers] = useState<null | User[]>(null)

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

  return (
    <Layout>
      <AdminUsers users={users || data.allUsers} setUsers={setUsers} />
    </Layout>
  )
}

const Users: React.FC<GetAppProps> = ({ data }) => {
  const { loading, error, session } = data
  const admin = _.get(session, 'user.isAdmin', false)

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

  if (admin === 'false') {
    return (
      <Layout>
        <h1>You must be admin to access this page</h1>
      </Layout>
    )
  }

  return <LoadUsers />
}

export default withGetApp()(Users)
