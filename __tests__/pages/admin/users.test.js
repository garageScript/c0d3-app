import '../../../__mocks__/useIsMac.mock'
import '../../../__mocks__/useBreakpoint.mock'
import React from 'react'
import {
  render,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import '@testing-library/jest-dom'
import GET_APP from '../../../graphql/queries/getApp'
import GET_SESSION from '../../../graphql/queries/getSession'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import dummyAlertData from '../../../__dummy__/alertData'
import Users from '../../../pages/admin/users'
import ALL_USERS from '../../../graphql/queries/allUsers'

const dummyUsersData = [
  {
    cliToken: 'WRyzWxDc_DqR3Avi7xcGD',
    email: 'some@mail.com',
    id: '5',
    isAdmin: true,
    name: 'admin admin',
    username: 'admin'
  },
  {
    cliToken: 'acRy_p-HK9sTU8H1GfrJV',
    email: 'some@mail.com',
    id: '6',
    isAdmin: false,
    name: 'newbie newbie',
    username: 'newbie',
    id: '2'
  }
]
const mocks = [
  {
    request: { query: ALL_USERS },
    result: {
      data: {
        allUsers: dummyUsersData
      }
    }
  },
  {
    request: { query: GET_APP },
    result: {
      data: {
        session: dummySessionData,
        lessons: dummyLessonData,
        alerts: dummyAlertData
      }
    }
  },
  {
    request: { query: GET_SESSION },
    result: {
      data: {
        session: {
          ...dummySessionData
        }
      }
    }
  }
]

describe('Users test', () => {
  test('Should be able to switch search options', async () => {
    const { container, getByRole, queryByText, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Users />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    expect(container).toMatchSnapshot()
    const input = getByLabelText('Search By:')
    expect(input).toBeTruthy()
    fireEvent.change(input, {
      target: { value: 'admin' }
    })
    expect(container).toMatchSnapshot()
    const searchByName = getByRole('button', { name: 'Name' })
    fireEvent.click(searchByName)
    expect(container).toMatchSnapshot()
    const filterByAdmin = getByRole('button', { name: 'Admins' })
    fireEvent.click(filterByAdmin)
    expect(container).toMatchSnapshot()
  })
})
