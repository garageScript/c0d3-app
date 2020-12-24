import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Thanks } from './Thanks'

describe('Thanks Component', () => {
  test('should call callback function when exit button is clicked', () => {
    let res = ''
    const expectedResult = 'babushka'
    const { container, getByRole } = render(
      <Thanks close={() => (res = expectedResult)} />
    )
    const doneBtn = getByRole('button')
    fireEvent.click(doneBtn)
    expect(res).toEqual(expectedResult)
    expect(container).toMatchSnapshot()
  })
})
