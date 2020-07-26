import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { FormCard } from './FormCard'

let testBtnOnClick = ''

const mockBtn = [
  {
    title: 'Create New Challenge',
    onClick: ok => (testBtnOnClick = ok)
  }
]

let mockValues = [{ title: 'super' }]

describe('FormCard Component', () => {
  test('Input value should be nothing when value prop is not there', () => {
    const { container, queryByTestId } = render(
      <FormCard values={mockValues} buttons={mockBtn} />
    )
    const input = queryByTestId('inputsuper')

    expect(input.value).toEqual('')
    expect(container).toMatchSnapshot()
  })

  test('Should render text onto textbox when user types', () => {
    const { container, queryByTestId } = render(
      <FormCard values={mockValues} buttons={mockBtn} />
    )
    const input = queryByTestId('inputsuper')

    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(input.value).toContain('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should render textbox when title is description', () => {
    mockValues = [{ title: 'description' }]
    const { container, queryByTestId } = render(
      <FormCard values={mockValues} buttons={mockBtn} />
    )
    const input = queryByTestId('textbox')
    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(input.value).toContain('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Call function when button is clicked', () => {
    mockValues = [{ title: 'description' }]
    const { container, queryByText } = render(
      <FormCard values={mockValues} buttons={mockBtn} />
    )
    const button = queryByText('Create New Challenge')
    fireEvent.click(button, { button: 1 })
    expect(testBtnOnClick).toEqual([{ title: 'description' }])
    expect(container).toMatchSnapshot()
  })

  test('Should output empty title when title is empty', () => {
    mockValues = [{ title: '' }]
    const { container, getByTestId } = render(
      <FormCard values={mockValues} buttons={mockBtn} />
    )
    const input = getByTestId('h50')
    expect(input.value).toBeFalsy
    expect(container).toMatchSnapshot()
  })

  test('Should render nothing if id is a title', () => {
    mockValues = [{ title: 'id' }]
    const { container } = render(
      <FormCard values={mockValues} buttons={mockBtn} />
    )
    expect(container).toBeFalsy
    expect(container).toMatchSnapshot()
  })
})
