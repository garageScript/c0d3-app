import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { FormCard } from './FormCard'

let testBtnOnClick = ''

const mockBtn = {
  title: 'Create New Challenge',
  onClick: ok => (testBtnOnClick = ok)
}

let mockValues = [{ title: 'super' }]

describe('FormCard Component', () => {
  test('Input value should be nothing when value prop is not there', () => {
    const { container, queryByTestId } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const input = queryByTestId('inputsuper')

    expect(input.value).toEqual('')
    expect(container).toMatchSnapshot()
  })

  test('Should render text onto textbox when user types', () => {
    const { container, queryByTestId } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const input = queryByTestId('inputsuper')

    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(input.value).toContain('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should render MdInput component when type is MD_INPUT', () => {
    mockValues = [{ title: 'fireStarter', type: 'MD_INPUT' }]
    const { container, queryByTestId } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const input = queryByTestId('textbox')
    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(input.value).toContain('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should call function with updated array as parameter when button is clicked', () => {
    const { container, queryByText } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const button = queryByText('Create New Challenge')
    fireEvent.click(button, { button: 1 })
    expect(testBtnOnClick).toEqual([
      {
        title: 'fireStarter',
        type: 'MD_INPUT',
        value: 'Javascript'
      }
    ])
    expect(container).toMatchSnapshot()
  })

  test('Should not call onSubmit callback function if there is a nums error', () => {
    testBtnOnClick = 'cat'
    mockValues = [...mockValues, { title: 'fiary', error: ['nums'] }]
    const { container, queryByText } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const button = queryByText('Create New Challenge')
    fireEvent.click(button, { button: 1 })
    expect(testBtnOnClick).toEqual('cat')
    expect(container).toMatchSnapshot()
  })

  test('Should not call onSubmit callback function if there is a require error', () => {
    mockValues = [...mockValues, { title: 'fiary', error: ['require'] }]
    const { container, queryByText } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const button = queryByText('Create New Challenge')
    fireEvent.click(button, { button: 1 })
    expect(testBtnOnClick).toEqual('cat')
    expect(container).toMatchSnapshot()
  })

  test('Should output empty title when title is empty', () => {
    mockValues = [{ title: '' }]
    const { container, getByTestId } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    const input = getByTestId('h50')
    expect(input.value).toBeFalsy
    expect(container).toMatchSnapshot()
  })

  test('Should render nothing if id is a title', () => {
    mockValues = [{ title: 'id' }]
    const { container } = render(
      <FormCard values={mockValues} onSubmit={mockBtn} />
    )
    expect(container).toBeFalsy
    expect(container).toMatchSnapshot()
  })
})
