import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { AdminDropDownMenu } from './AdminDropDownMenu'

describe('MdInput Component', () => {
  test('Should add `show` class when Admin div is clicked on', () => {
    const { container, queryByTestId } = render(<AdminDropDownMenu />)
    const adminButton = queryByTestId('adminButton')
    const menu = queryByTestId('menu')

    fireEvent.click(adminButton)

    expect(menu.classList.contains('show')).toBe(true)
    expect(container).toMatchSnapshot()
  })

  test('Should remove `show` class onMouseOut of menu', () => {
    const { container, queryByTestId } = render(<AdminDropDownMenu />)
    const menu = queryByTestId('menu')

    fireEvent.mouseOut(menu)
    expect(menu.classList.contains('show')).toBeFalsy
    expect(container).toMatchSnapshot()
  })
})
