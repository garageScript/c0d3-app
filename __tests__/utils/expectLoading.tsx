import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import GET_APP from '../../graphql/queries/getApp'

const mocks = [
  {
    request: { query: GET_APP },
    result: {}
  }
]

const expectLoading = async (Component: React.ComponentType) => {
  const { findByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Component />
    </MockedProvider>
  )
  const element = await findByRole('heading', { name: /loading/i })
  await waitFor(() => expect(element).toBeInTheDocument())
}

export default expectLoading
