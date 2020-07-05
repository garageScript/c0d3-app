import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MdInput } from './MdInput'

describe('MdInput Component', () => {
  test('Should render text onto textbox when user types', () => {
    const { container, queryByTestId } = render(<MdInput />)
    const textbox = queryByTestId('textbox')

    fireEvent.change(textbox, {
      target: { value: 'Javascript' }
    })

    expect(textbox.value).toContain('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should switch to Write mode when user clicks Write button', () => {
    const { container, getByRole, queryByTestId } = render(<MdInput />)
    const writeButton = getByRole('button', { name: 'Write' })

    fireEvent.click(writeButton)

    const textbox = queryByTestId('textbox')
    const markdown = queryByTestId('markdown')
    expect(markdown).toBeNull()
    expect(textbox).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('Should switch to Preview mode when user clicks Preview button', () => {
    const { container, getByRole, queryByTestId } = render(<MdInput />)
    const previewButton = getByRole('button', { name: 'Preview' })

    fireEvent.click(previewButton)

    const textbox = queryByTestId('textbox')
    const markdown = queryByTestId('markdown')
    expect(textbox).toBeNull()
    expect(markdown).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
})
