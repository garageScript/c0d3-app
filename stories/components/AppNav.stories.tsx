import * as React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import GET_SESSION from '../../graphql/queries/getSession'
import AppNav from '../../components/AppNav'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'

export default {
  component: AppNav,
  title: 'Components/AppNav'
}

export const LoggedIn: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_SESSION },
      result: {
        data: {
          session: {
            user: {
              id: 1,
              username: 'fakeusername',
              name: 'fake user'
            }
          }
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppNav />
    </MockedProvider>
  )
}

export const LoggedOut: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_SESSION },
      result: {
        data: {
          session: null
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppNav />
    </MockedProvider>
  )
}
