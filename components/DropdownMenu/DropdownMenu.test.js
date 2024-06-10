import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { DropdownMenu } from './DropdownMenu'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const dropdownMenuItems = [
  { title: 'Lessons', path: '/admin/lessons', as: 'button' },
  null,
  { title: 'Users', path: '/admin/users', as: 'button' },
  { title: 'Alerts', path: '/admin/alerts', as: 'button' }
]

let testBtnOnClick = ''

describe('DropdownMenu Component', () => {
  test('Should render custom toggle', () => {
    const textToTest = 'custom toggle'

    const { queryByText } = render(
      <DropdownMenu
        items={dropdownMenuItems}
        customToggle={{ Component: () => <span>{textToTest}</span> }}
      />
    )

    expect(queryByText(textToTest)).toBeInTheDocument()
  })

  test('Should render custom toggle styles', () => {
    const { queryByText } = render(
      <DropdownMenu
        items={dropdownMenuItems}
        customToggle={{ style: 'customClass' }}
      />
    )

    expect(queryByText('None').classList.contains('customClass')).toBeTruthy()
  })

  test('Should render divider when an item is null', () => {
    const { container, queryByRole } = render(
      <DropdownMenu title="Admin" items={dropdownMenuItems} />
    )
    const div = queryByRole('separator')

    expect(div).toBeTruthy
    expect(container).toMatchSnapshot()
  })

  test('Should display default title when no title is passed', () => {
    const { queryByText } = render(<DropdownMenu items={dropdownMenuItems} />)

    expect(queryByText('None')).toBeInTheDocument()
  })

  test('Should change value of testBtnOnClick upon click', () => {
    dropdownMenuItems[0].onClick = val => (testBtnOnClick = val)

    const { container } = render(
      <DropdownMenu title="Admin" items={dropdownMenuItems} />
    )

    const btn = screen.queryByText('Admin')
    fireEvent.click(btn, { button: 1 })

    const lessons = screen.queryAllByText('Lessons')[0]
    fireEvent.click(lessons, { button: 1 })

    waitFor(() => expect(testBtnOnClick).toEqual('Lessons'))
    expect(container).toMatchSnapshot()
  })
})
