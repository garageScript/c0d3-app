import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import InternalServerError from '../../pages/500'

describe('500 Error Page', () => {
  it('should render', async () => {
    const { container } = render(
      <MockedProvider>
        <InternalServerError />
      </MockedProvider>
    )
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
