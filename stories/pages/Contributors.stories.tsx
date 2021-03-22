import * as React from 'react'
import Contributors from '../../pages/contributors'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import dummySessionData from '../../__dummy__/sessionData'
import { withTestRouter } from '../../__tests__/utils/withNextRouter'

export default {
  component: Contributors,
  title: 'Pages/Contributors'
}

export const _Contributors: React.FC = () => {
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
      <Contributors />
    </MockedProvider>
  )
}
