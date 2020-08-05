import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import _ from 'lodash'
import { Button } from '../../theme/Button'
import changeAdminRights from '../../../graphql/queries/changeAdminRights'
import { User } from '../../../graphql'

type UsersListProps = {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

type RowDataProps = {
  user: any
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  index: number
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
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

export const headerValues = ['ID', 'Username', 'Name', 'Email', 'Admin']
export const userProperties = ['id', 'username', 'name', 'email', 'isAdmin']

const TableHeaders: React.FC = () => {
  const head = headerValues.map((property, key) => (
    <th key={key} style={{ fontSize: '1.5rem' }}>
      {property}
    </th>
  ))

  return (
    <thead>
      <tr style={{ textAlign: 'center' }}>{head}</tr>
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

  const mutationVariable = {
    variables: {
      id: parseInt(id + ''),
      status: isAdmin ? 'false' : 'true'
    }
  }

  const changeButton = async () => {
    await changeRights(mutationVariable)
    const newUsers = users && [...users]
    if (newUsers) {
      newUsers[index].isAdmin = isAdmin ? 'false' : 'true'
    }
    setUsers(newUsers)
  }

  return (
    <Button type={isAdmin ? 'danger' : 'success'} onClick={changeButton}>
      {(isAdmin ? 'Remove' : 'Grant') + ' Admin Rights'}
    </Button>
  )
}

const RowData: React.FC<RowDataProps> = ({ user, users, setUsers, index }) => {
  const data = userProperties.map((property: string, key: number) => {
    let value = user[property]

    const displayOption =
      property !== 'isAdmin' ? (
        value
      ) : (
        <AdminOption
          isAdmin={user[property] === 'true'}
          setUsers={setUsers}
          index={index}
          users={users}
          id={users && users[index].id}
        />
      )

    return (
      <td style={{ verticalAlign: 'middle' }} key={key}>
        {displayOption}
      </td>
    )
  })

  return <>{data}</>
}

const UsersList: React.FC<UsersListProps> = ({ users, setUsers }) => {
  const list =
    users &&
    users.reduce((acc: any[], user: any, usersIndex: number) => {
      acc.push(
        <tr key={usersIndex} style={{ textAlign: 'center' }}>
          <RowData
            user={user}
            setUsers={setUsers}
            index={usersIndex}
            users={users}
          />
        </tr>
      )

      return acc
    }, [])

  return <tbody>{list}</tbody>
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers }) => (
  <table className="table table-striped">
    <TableHeaders />
    <UsersList users={users} setUsers={setUsers} />
  </table>
)
