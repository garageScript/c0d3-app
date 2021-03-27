import React from 'react'
import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import InternalServerError from '../../pages/500'

describe('500 Error Page', () => {
  it('should render', async () => {
    const { container, queryByRole } = render(
      <MockedProvider>
        <InternalServerError />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() =>
      queryByRole('heading', { name: /loading/i })
    )
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
