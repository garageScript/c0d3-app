import * as React from 'react'
import ForgotPassword from '../../pages/forgotpassword'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import dummySessionData from '../../__dummy__/sessionData'

export default {
  component: ForgotPassword,
  title: 'Pages/ForgotPassword'
}

export const _ForgotPassword: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: dummySessionData,
          lessons: [],
          alerts: []
        }
      }
    }
  ]

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ForgotPassword />
    </MockedProvider>
  )
}
