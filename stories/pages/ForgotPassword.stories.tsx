import * as React from 'react'
import ForgotPassword from '../../pages/forgotpassword'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import dummySessionData from '../../__dummy__/sessionData'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'

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

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ForgotPassword />
    </MockedProvider>
  )
}
