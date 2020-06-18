import * as React from 'react'
import { MockedProvider } from '@apollo/react-testing'
import { GET_APP } from '../../graphql/queries'
import AppNav from '../../components/AppNav'

export default {
  component: AppNav,
  title: 'Components/AppNav'
}

export const LoggedIn: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: [],
          session: {
            user: {
              id: 1,
              username: 'fake user'
            },
            submissions: [],
            lessonStatus: []
          },
          alerts: []
        }
      }
    }
  ]

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppNav />
    </MockedProvider>
  )
}

export const LoggedOut: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: [],
          session: {
            user: null,
            submissions: [],
            lessonStatus: []
          },
          alerts: []
        }
      }
    }
  ]

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppNav />
    </MockedProvider>
  )
}
