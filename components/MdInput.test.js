import React from 'react'
import {
  render,
  screen,
  fireEvent,
  queryByTestId
} from '@testing-library/react'
import { MdInput } from './MdInput'

describe('write inside textarea', () => {
  test('renders text when user types', () => {
    const { container } = render(<MdInput />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Javascript' }
    })
    expect(screen.getByRole('textbox').value).toContain('Javascript')
    expect(container).toMatchSnapshot()
  })
})

describe('click Write Button', () => {
  test('switches to write mode when user clicks Write button', () => {
    const { container } = render(<MdInput />)
    fireEvent.click(screen.getByText('Write'))
    const textbox = queryByTestId(container, 'textbox')
    const markdown = queryByTestId(container, 'markdown')
    expect(markdown).toBeNull()
    expect(textbox).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
})

describe('click Preview Button', () => {
  test('switches to Preview mode when user clicks Preview button', () => {
    const { container } = render(<MdInput />)
    fireEvent.click(screen.getByText('Preview'))
    const textbox = queryByTestId(container, 'textbox')
    const markdown = queryByTestId(container, 'markdown')
    expect(textbox).toBeNull()
    expect(markdown).toBeTruthy()
    expect(container).toMatchSnapshot()
  })
})
