import React, { useState } from 'react'
import allUsers from '../../graphql/queries/allUsers'
import {
  UsersTable,
  headerTitles
} from '../../components/admin/users/AdminUsersTable'
import { User, withGetApp, GetAppProps } from '../../graphql/index'
import { AdminLayout } from '../../components/admin/AdminLayout'
import withQueryLoader, {
  QueryDataProps
} from '../../containers/withQueryLoader'
import { FilterButtons } from '../../components/FilterButtons'
import _ from 'lodash'

type AllUsersData = {
  allUsers: User[]
}

type filter = {
  option: string
  admin: string
  searchTerm: string
}

const initialSearchOptions: filter = {
  option: 'Username',
  admin: 'None',
  searchTerm: ''
}

const adminFilters = ['Admins', 'Non-Admins', 'None']

const searchHeaders = [...headerTitles]

searchHeaders.length = 4

const AdminUsers: React.FC<QueryDataProps<AllUsersData>> = ({ queryData }) => {
  const [searchOption, setSearchOption] = useState<filter>(initialSearchOptions)
  const [users, setUsers] = useState<User[]>(queryData.allUsers)
  /*
	  The reason debounce is used here is to prevent page rerenders on every keystroke.
	  If there is a rerender on every keystroke, the CPU consumption is high and
	  creates a perception of the page being slow and sluggish.
	  Therefore, we only rerender when the user stops typing.
  */
  const run = _.debounce(setSearchOption, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchOption = {
      ...searchOption,
      searchTerm: e.target.value
    }
    run(newSearchOption)
  }

  const changeFilter = (str: string, type: string) => {
    const newSearchOption: any = { ...searchOption }
    newSearchOption[type] = str
    setSearchOption(newSearchOption)
  }

  return (
    <div className="d-flex flex-column col-12">
      <h1 className="text-primary text-center font-weight-bold display-1">
        Users
      </h1>
      <div className="mb-2">
        <FilterButtons
          options={searchHeaders}
          onClick={(value: string) => changeFilter(value, 'option')}
          currentOption={searchOption.option}
        >
          Search By:
        </FilterButtons>
      </div>
      <input type="text" className="form-control" onChange={handleChange} />
      <div className="mt-2 mb-2">
        <FilterButtons
          options={adminFilters}
          onClick={(value: string) => changeFilter(value, 'admin')}
          currentOption={searchOption.admin}
        >
          Filter By:
        </FilterButtons>
      </div>
      <UsersTable
        users={users}
        setUsers={setUsers}
        searchOption={searchOption}
      />
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
