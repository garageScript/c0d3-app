import React, { useState } from 'react'
import allUsers from '../../graphql/queries/allUsers'
import { UsersTable } from '../../components/admin/users/AdminUsersTable'
import { User, withGetApp, GetAppProps } from '../../graphql/index'
import { AdminLayout } from '../../components/admin/AdminLayout'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import {
  SearchOptions,
  FilterOptions
} from '../../components/admin/users/AdminUsersFilterOptions'
import { SearchBar } from '../../components/admin/users/AdminUsersSearchBar'

type AllUsersData = {
  allUsers: User[]
}

const initialSearchOptions = {
  option: 'username',
  admin: 'None',
  searchTerm: ''
}

const AdminUsers: React.FC<QueryDataProps<AllUsersData>> = ({ queryData }) => {
  const [searchOption, setSearchOption] = useState(initialSearchOptions)
  const [users, setUsers] = useState<User[]>(queryData.allUsers)
  return (
    <div className="d-flex flex-column col-12">
      <h1 className="text-primary text-center font-weight-bold display-1">
        Users
      </h1>
      <SearchOptions
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />
      <SearchBar
        setSearchOption={setSearchOption}
        searchOption={searchOption}
      />
      <FilterOptions
        searchOption={searchOption}
        setSearchOption={setSearchOption}
      />
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
