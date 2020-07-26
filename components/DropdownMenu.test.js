import React from 'react'
import { render } from '@testing-library/react'
import { DropdownMenu } from './DropdownMenu'

const dropdownMenuItems = [
  { title: 'Lessons', path: '/admin/lessons' },
  null,
  { title: 'Users', path: '/admin/users' },
  { title: 'Alerts', path: '/admin/alerts' }
]

let testBtnOnClick = ''

describe('MdInput Component', () => {
  test('Should render divider when an item is null', () => {
    const { container, queryByRole } = render(
      <DropdownMenu title="Admin" items={dropdownMenuItems} />
    )
    const div = queryByRole('separator')

    expect(div).toBeTruthy
    expect(container).toMatchSnapshot()
  })

  test('Should change value of testBtnOnClick upon click', () => {
    dropdownMenuItems[0].onClick = () => (testBtnOnClick = 'lolztestsucceeded')
    const { container, queryByText } = render(
      <DropdownMenu title="Admin" items={dropdownMenuItems} />
    )
    const btn = queryByText('Lessons')

    expect(testBtnOnClick).toEqual('lolztestsucceeded')
    expect(container).toMatchSnapshot()
  })
})
