import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import { Button } from '../../theme/Button'
import changeAdminRights from '../../../graphql/queries/changeAdminRights'
import { User } from '../../../graphql'
import { AdminUsersSplitSearch } from './AdminUsersSplitSearch'

type filter = {
  option: string
  admin: string
  searchTerm: string
}

type UsersListProps = {
  users: User[]
  searchOption: filter
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

type RowDataProps = {
  user: any
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  index: number
  option: string
  searchTerm: string
}

type AdminOptionProps = {
  isAdmin: boolean
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  index: number
  id: string | null | undefined
}

type UsersTableProps = {
  users: User[]
  searchOption: filter
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const headerTitles = ['ID', 'Username', 'Name', 'Email', 'Admin']
export const userProperties = ['id', 'username', 'name', 'email', 'isAdmin']

const TableHeaders: React.FC = () => {
  const head = headerTitles.map((title, key) => <th key={key}>{title}</th>)

  return (
    <thead>
      <tr className="text-center">{head}</tr>
    </thead>
  )
}

const AdminOption: React.FC<AdminOptionProps> = ({
  isAdmin,
  setUsers,
  index,
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
    newUsers[index].isAdmin = newAdminRights
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
  index,
  searchTerm,
  option
}) => {
  option = _.lowerCase(option)

  const data = userProperties.map((property: string, key: number) => {
    let value = user[property]

    if (searchTerm && property === option) {
      value = AdminUsersSplitSearch(value, searchTerm)
    }

    const displayOption =
      property !== 'isAdmin' ? (
        value
      ) : (
        <AdminOption
          isAdmin={user[property] === 'true'}
          setUsers={setUsers}
          index={index}
          users={users}
          id={users[index].id}
        />
      )

    return (
      <td className="align-middle" key={key}>
        {displayOption}
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
      const value = user[_.lowerCase(option)]
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
          index={usersIndex}
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
}) => (
  <table className="table table-striped">
    <TableHeaders />
    <UsersList users={users} setUsers={setUsers} searchOption={searchOption} />
  </table>
)
