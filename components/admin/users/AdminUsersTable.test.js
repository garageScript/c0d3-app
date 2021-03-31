import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import CHANGE_ADMIN_RIGHTS from '../../../graphql/queries/changeAdminRights'
import { UsersTable } from './AdminUsersTable'
const dummyUsersData = [
  {
    cliToken: 'WRyzWxDc_DqR3Avi7xcGD',
    email: 'some@mail.com',
    id: 5,
    isAdmin: 'true',
    name: 'admin admin',
    username: 'admin'
  },
  {
    cliToken: 'acRy_p-HK9sTU8H1GfrJV',
    email: 'some@mail.com',
    id: 6,
    isAdmin: 'false',
    name: 'newbie newbie',
    username: 'newbie'
  }
]

const mocks = [
  {
    request: {
      query: CHANGE_ADMIN_RIGHTS,
      variables: { id: 6, status: 'true' }
    },
    result: {
      data: { changeAdminRights: { success: true } }
    }
  }
]

describe('AdminUsersTable test', () => {
  test('Should add admin rights', async () => {
    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UsersTable
          users={dummyUsersData}
          searchOption={{
            option: 'username',
            admin: 'None',
            searchTerm: ''
          }}
          setUsers={jest.fn()}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    const button = getByRole('button', { name: 'Add' })
    fireEvent.click(button)
    expect(container).toMatchSnapshot()
  })
  test('Should search by non-admin role', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UsersTable
          users={dummyUsersData}
          searchOption={{
            option: 'username',
            admin: 'Non-Admins',
            searchTerm: 'admin'
          }}
          setUsers={jest.fn()}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should search by admin role', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UsersTable
          users={dummyUsersData}
          searchOption={{
            option: 'username',
            admin: 'Admins',
            searchTerm: 'newbie'
          }}
          setUsers={jest.fn()}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render successful search', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UsersTable
          users={dummyUsersData}
          searchOption={{
            option: 'username',
            admin: 'None',
            searchTerm: 'newbie'
          }}
          setUsers={jest.fn()}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
})