import * as React from 'react'
import ResetPassword from '../../pages/confirm/[token]'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import { withTestRouter } from '../../__tests__/utils/withNextRouter'

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

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ResetPassword />
    </MockedProvider>
  )
}
