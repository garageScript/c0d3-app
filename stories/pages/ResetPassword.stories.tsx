import * as React from 'react'
import ResetPassword from '../../pages/confirm/[token]'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'

export default {
  component: ResetPassword,
  title: 'Pages/ResetPassword'
}

export const _ResetPassword: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: null,
          lessons: [],
          alerts: []
        }
      }
    }
  ]

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ResetPassword />
    </MockedProvider>
  )
}
