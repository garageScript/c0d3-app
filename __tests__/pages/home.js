import React from 'react'
import { render } from '@testing-library/react'
import Home from '../../pages/home'

describe('Home Page', () => {
  test('Should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
