import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Thanks from './Thanks'

describe('Thanks Component', () => {
  test('should call callback function when done button is clicked', () => {
    let res = ''
    const expectedResult = 'babushka'
    const { container, getByRole } = render(
      <Thanks close={() => (res = expectedResult)} />
    )
    const doneButton = getByRole('button')
    fireEvent.click(doneButton)
    expect(res).toEqual(expectedResult)
    expect(container).toMatchSnapshot()
  })
})
