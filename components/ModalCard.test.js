import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ModalCard } from './ModalCard'

describe('ModalCard Component', () => {
  test('should call callback function when exit button is clicked', () => {
    let res = ''
    const expectedResult = 'potatus maximus'
    const { container, getByRole } = render(
      <ModalCard show={true} close={() => (res = expectedResult)} />
    )
    const exitBtn = getByRole('img')
    fireEvent.click(exitBtn)
    expect(res).toEqual(expectedResult)
    expect(container).toMatchSnapshot()
  })
})
