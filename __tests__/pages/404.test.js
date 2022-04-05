import '../../__mocks__/next-auth/nextAuthAPI.mock'
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import NotFound from '../../pages/404'

describe('404 Error Page', () => {
  it('should render', async () => {
    const { container } = render(
      <MockedProvider>
        <NotFound />
      </MockedProvider>
    )
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
