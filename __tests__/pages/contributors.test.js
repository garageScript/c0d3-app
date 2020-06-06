import React from 'react'
import { render } from '@testing-library/react'
import ContributorsPage from '../../pages/contributors'

describe('Contributor Page', () => {
  test('Should render contributor page', async () => {
    const { container } = render(<ContributorsPage />)
    expect(container).toMatchSnapshot()
  })
})
