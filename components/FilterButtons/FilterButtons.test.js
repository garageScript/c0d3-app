import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FilterButtons from './FilterButtons'

let testBtnOnClick = ''

const mockOptions = ['Admins', 'Non-Admins', 'None']

describe('FilterButtons Component', () => {
  test('Should call function with updated array as parameter when button is clicked', () => {
    const { container, queryByText } = render(
      <FilterButtons
        currentOption=""
        options={mockOptions}
        onClick={value => (testBtnOnClick = value)}
      >
        Filter By:
      </FilterButtons>
    )
    const button = queryByText('Admins')
    fireEvent.click(button, { button: 1 })
    expect(testBtnOnClick).toEqual('Admins')
    expect(container).toMatchSnapshot()
  })
})
