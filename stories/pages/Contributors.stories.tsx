import * as React from 'react'
import Contributors from '../../pages/contributors'
import { MockedProvider } from '@apollo/react-testing'
import { GET_APP } from '../../graphql/queries'
import dummySessionData from '../../__dummy__/sessionData'

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

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Contributors />
    </MockedProvider>
  )
}
