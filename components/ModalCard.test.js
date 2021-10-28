import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
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
  test('should not show close modal image icon if hideable attribute is false', () => {
    const { queryByRole } = render(
      <ModalCard show={true} hideable={false} close={() => {}} />
    )
    expect(queryByRole('img')).not.toBeInTheDocument()
  })
})
