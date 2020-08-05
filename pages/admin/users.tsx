import React, { useState } from 'react'
import allUsers from '../../graphql/queries/allUsers'
import { UsersTable } from '../../components/admin/users/AdminUsersTable'
import { User, withGetApp, GetAppProps } from '../../graphql/index'
import { AdminLayout } from '../../components/admin/AdminLayout'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'

const titleStyle: React.CSSProperties | undefined = {
  fontSize: '6rem',
  textAlign: 'center',
  fontWeight: 'bold'
}

type AllUsersData = {
  allUsers: User[]
}

const AdminUsers: React.FC<QueryDataProps<AllUsersData>> = ({ queryData }) => {
  const [users, setUsers] = useState<User[]>(queryData.allUsers)
  return (
    <div className="d-flex flex-column col-12">
      <span className="text-primary" style={titleStyle}>
        Users
      </span>
      <UsersTable users={users} setUsers={setUsers} />
    </div>
  )
}

const LoadUsers: React.FC = withQueryLoader<AllUsersData>(
  {
    query: allUsers
  },
  AdminUsers
)

const Users: React.FC<GetAppProps> = ({ data }) => {
  return (
    <AdminLayout data={data}>
      <LoadUsers />
    </AdminLayout>
  )
}

export default withGetApp()(Users)
