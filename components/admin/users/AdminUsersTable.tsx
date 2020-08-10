import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import { Button } from '../../theme/Button'
import changeAdminRights from '../../../graphql/queries/changeAdminRights'
import { User } from '../../../graphql'
import { AdminUsersSplitSearch } from './AdminUsersSplitSearch'
import { filter } from '../../../pages/admin/users'

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
  id: string | null | undefined
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

  const newAdminRights = isAdmin ? 'false' : 'true'

  const mutationVariable = {
    variables: {
      id: parseInt(id + ''),
      status: newAdminRights
    }
  }

  const changeButton = async () => {
    await changeRights(mutationVariable)
    const newUsers = [...users]
    newUsers[usersIndex].isAdmin = newAdminRights
    setUsers(newUsers)
  }

  return (
    <Button type={isAdmin ? 'danger' : 'success'} onClick={changeButton}>
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
  option = _.lowerCase(option)

  const data = userProperties.map((property: string, key: number) => {
    let value = user[property]

    if (searchTerm && property === option) {
      value = AdminUsersSplitSearch(value, searchTerm)
    }

    if (property === 'isAdmin')
      value = (
        <AdminOption
          isAdmin={user[property] === 'true'}
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
  let { option } = searchOption
  option = _.lowerCase(option)

  const list = users.reduce((acc: any[], user: any, usersIndex: number) => {
    if (searchTerm) {
      const value = user[option]
      if (!value.includes(searchTerm)) return acc
    }

    const { isAdmin } = user

    if (admin === 'Non-Admins' && isAdmin === 'true') return acc
    if (admin === 'Admins' && isAdmin === 'false') return acc

    acc.push(
      <tr key={usersIndex} className="text-center">
        <RowData
          user={user}
          setUsers={setUsers}
          usersIndex={usersIndex}
          users={users}
          option={option}
          searchTerm={searchTerm}
        />
      </tr>
    )

    return acc
  }, [])

  return <tbody>{list}</tbody>
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
