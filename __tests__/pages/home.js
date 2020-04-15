jest.mock('next/router')
import React from 'react'
import { render } from '@testing-library/react'
import Home from '../../pages/home'
import { useRouter } from 'next/router'

useRouter.mockReturnValue({
  route: null
})

describe('Home Page', () => {
  test('Should render correctly', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
