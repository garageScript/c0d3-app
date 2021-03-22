import React from 'react'
import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import NotFound from '../../pages/404'

describe('404 Error Page', () => {
  it('should render', async () => {
    const { container, queryByRole } = render(
      <MockedProvider>
        <NotFound />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() =>
      queryByRole('heading', { name: /loading/i })
    )
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
