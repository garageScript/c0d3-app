import React from 'react'
import { render } from '@testing-library/react'
import NavLink from './NavLink'

describe('NavLink Component', () => {
  test('Should render with active class when active', () => {
    const { container } = render(
      <NavLink path="/" activePath={true}>
        Link
      </NavLink>
    )
    expect(container.querySelector('.active')).not.toBeNull()
  })

  test('Should render without active class when not active', () => {
    const { container } = render(<NavLink path="/">Link</NavLink>)
    expect(container.querySelector('.active')).toBeNull()
  })
})
