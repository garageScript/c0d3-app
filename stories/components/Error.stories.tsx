import * as React from 'react'
import Error from '../../components/Error'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'

export default {
  components: Error,
  title: 'Components/Error'
}

export const NotFound: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: [],
          session: null,
          alerts: []
        }
      }
    }
  ]
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Error title="Page not found" src="/404.png" message="404 error" />
    </MockedProvider>
  )
}

export const Internal: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: [],
          session: null,
          alerts: []
        }
      }
    }
  ]
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Error title="Internal server error" message="No data" src="/500.png" />
    </MockedProvider>
  )
}
