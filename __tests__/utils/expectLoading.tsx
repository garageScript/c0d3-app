import React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import GET_APP from '../../graphql/queries/getApp'

const mocks = [
  {
    request: { query: GET_APP },
    result: {}
  }
]

const expectLoading = (Component: React.ComponentType) => {
  const { getByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Component />
    </MockedProvider>
  )
  expect(getByRole('heading', { name: /loading/i })).toBeInTheDocument()
}

export default expectLoading
