import React from 'react'
import { render } from '@testing-library/react'
import NavLink from './NavLink'

describe('NavLink Component', () => {
  test('Should render with active class when active', () => {
    const tree = (
      <NavLink path="/" activePath={true}>
        Link
      </NavLink>
    )
    const { container } = render(tree)
    expect(container.querySelector('.active')).not.toBeNull()
  })

  test('Should render without active class when not active', () => {
    const tree = (
      <NavLink path="/" activePath={false}>
        Link
      </NavLink>
    )
    const { container } = render(tree)
    expect(container.querySelector('.active')).toBeNull()
  })
})
