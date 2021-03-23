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

const expectLoading = (tree: Parameters<typeof render>[0]) => {
  const { getByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {tree}
    </MockedProvider>
  )
  expect(getByRole('heading', { name: /loading/i })).toBeInTheDocument()
}

export default expectLoading
