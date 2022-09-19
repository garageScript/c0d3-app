import { useMutation } from '@apollo/client'
import React from 'react'
import { Button } from '../../theme/Button'
import changeAdminRights from '../../../graphql/queries/changeAdminRights'
import { User } from '../../../graphql'
import { AdminUsersSplitSearch } from './AdminUsersSplitSearch'
import { filter } from '../../../pages/admin/users'
import _ from 'lodash'

type UsersListProps = {
  users: User[]
  searchOption: filter
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

type RowDataProps = {
  user: any
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  usersIndex: number
  option: string
  searchTerm: string
}

type AdminOptionProps = {
  isAdmin: boolean
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  usersIndex: number
  id: number | null | undefined
}

type UsersTableProps = {
  users: User[]
  searchOption: filter
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const headerTitles = ['ID', 'Username', 'Name', 'Email', 'Admin']
export const userProperties = ['id', 'username', 'name', 'email', 'isAdmin']

const AdminOption: React.FC<AdminOptionProps> = ({
  isAdmin,
  setUsers,
  usersIndex,
  users,
  id
}) => {
  const [changeRights] = useMutation(changeAdminRights)

  const newAdminRights = !isAdmin

  const mutationVariable = {
    variables: {
      id: parseInt(id + ''),
      status: newAdminRights
    }
  }

  const changeButton = () => {
    changeRights(mutationVariable)
    const newUsers = _.cloneDeep(users)
    newUsers[usersIndex].isAdmin = newAdminRights
    setUsers(newUsers)
  }

  return (
    <Button btnType={isAdmin ? 'danger' : 'success'} onClick={changeButton}>
      {isAdmin ? 'Remove' : 'Add'}
    </Button>
  )
}

const RowData: React.FC<RowDataProps> = ({
  user,
  users,
  setUsers,
  usersIndex,
  searchTerm,
  option
}) => {
  option = option.toLowerCase()

  const data = userProperties.map((property: string, key: number) => {
    let value = user[property]

    if (searchTerm && property === option) {
      value = AdminUsersSplitSearch(value, searchTerm)
    }

    if (property === 'isAdmin')
      value = (
        <AdminOption
          isAdmin={user[property]}
          setUsers={setUsers}
          usersIndex={usersIndex}
          users={users}
          id={users[usersIndex].id}
        />
      )

    return (
      <td className="align-middle" key={key}>
        {value}
      </td>
    )
  })

  return <>{data}</>
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  setUsers,
  searchOption
}) => {
  const { searchTerm, admin } = searchOption
  const option: any = searchOption.option.toLowerCase()

  // usersIndex is needed for the RowData component to function properly
  const usersListIndex: any = []
  const searchTermRegex = new RegExp(searchTerm.toLowerCase(), 'i')

  // remove all users from list that are not going to be rendered
  const list: User[] = users.filter((user: any, usersIndex) => {
    let bool = true

    if (searchTerm) bool = searchTermRegex.test(user[option])
    if (bool && admin !== undefined) {
      bool = admin === user.isAdmin
    }

    bool && usersListIndex.push(usersIndex)
    return bool
  })

  const usersList = list.map((user: User, key: number) => {
    return (
      <tr key={key} className="text-center">
        <RowData
          user={user}
          setUsers={setUsers}
          usersIndex={usersListIndex.shift()}
          users={users}
          option={option}
          searchTerm={searchTerm}
        />
      </tr>
    )
  })

  return <tbody>{usersList}</tbody>
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users,
  setUsers,
  searchOption
}) => {
  const head = headerTitles.map((title, key) => <th key={key}>{title}</th>)

  return (
    <table className="table table-striped">
      <thead>
        <tr className="text-center">{head}</tr>
      </thead>
      <UsersList
        users={users}
        setUsers={setUsers}
        searchOption={searchOption}
      />
    </table>
  )
}
