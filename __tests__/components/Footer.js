import React from 'react'
import { render } from '@testing-library/react'
import Footer from '../../components/Footer'

describe('Footer component', () => {
  test('Should render appropriately with footerType', () => {
    const { container } = render(<Footer footerType="py-5 bg-white text-muted" />)
    expect(container).toMatchSnapshot()
  })
})
