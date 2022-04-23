import '../__mocks__/useIsMac.mock'
import '../__mocks__/useBreakpoint.mock'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { FormCard } from './FormCard'
import '@testing-library/jest-dom'
let testBtnOnClick = ''

const mockBtn = {
  title: 'Create New Challenge',
  onClick: () => (testBtnOnClick = 'lolzz')
}

let mockValues = [{ title: 'super' }]

describe('FormCard Component', () => {
  test('Should render MdInput component when type is MD_INPUT', () => {
    mockValues = [{ title: 'fireStarter', type: 'MD_INPUT' }]
    const { container, queryByTestId } = render(
      <FormCard
        values={mockValues}
        onSubmit={mockBtn}
        onChange={value => (test = value)}
      />
    )
    const input = queryByTestId('textbox')
    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(test).toEqual('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should call function with updated array as parameter when button is clicked', () => {
    const { container, queryByText } = render(
      <FormCard onChange={() => {}} values={mockValues} onSubmit={mockBtn} />
    )
    const button = queryByText('Create New Challenge')
    fireEvent.click(button, { button: 1 })
    expect(testBtnOnClick).toEqual('lolzz')
    expect(container).toMatchSnapshot()
  })

  test('Should update testing onChange variable when person types MdInput', () => {
    mockValues = [{ title: 'fireStarter', type: 'MD_INPUT' }]
    let testOnChange = 'lolz'
    const { container, queryByTestId } = render(
      <FormCard
        values={mockValues}
        onSubmit={mockBtn}
        onChange={(value, i) => (testOnChange = value + i)}
      />
    )
    const input = queryByTestId('textbox')
    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(testOnChange).toEqual('Javascript0')
    expect(container).toMatchSnapshot()
  })

  test('Should update testing onChange variable when person types', () => {
    mockValues = [{ title: 'fireStarter' }]
    let testOnChange = 'lolz'
    const { container, queryByTestId } = render(
      <FormCard
        values={mockValues}
        onSubmit={mockBtn}
        onChange={(value, i) => (testOnChange = value + i)}
      />
    )
    const input = queryByTestId('input0')
    fireEvent.change(input, {
      target: { value: 'Javascript' }
    })

    expect(testOnChange).toEqual('Javascript0')
    expect(container).toMatchSnapshot()
  })

  test('Should output empty title when title is empty', () => {
    mockValues = [{ title: '' }]
    const { container, getByTestId } = render(
      <FormCard onChange={() => {}} values={mockValues} onSubmit={mockBtn} />
    )
    const input = getByTestId('span0')
    expect(input.value).toBeFalsy
    expect(container).toMatchSnapshot()
  })

  test('Should display submit error message', () => {
    const mockError = 'Helpful Error Message Here :)'
    const { queryByText } = render(
      <FormCard
        onChange={() => {}}
        values={[{ title: '' }]}
        submitError={mockError}
        onSubmit={mockBtn}
      />
    )
    expect(queryByText(mockError)).toBeVisible()
  })

  test('Should render nothing if id is a title', () => {
    mockValues = [{ title: 'id' }]
    const { container } = render(
      <FormCard onChange={() => {}} values={mockValues} onSubmit={mockBtn} />
    )
    expect(container).toBeFalsy
    expect(container).toMatchSnapshot()
  })
})
