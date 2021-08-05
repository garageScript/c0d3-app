import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MdInput } from './MdInput'

const TestComponent = () => {
  const [testState, setTestState] = React.useState('')
  return <MdInput onChange={setTestState} value={testState} />
}

describe('MdInput Component', () => {
  test('Should render text onto textbox when user types', () => {
    const { container, queryByTestId } = render(<TestComponent />)
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
    expect(textbox.classList.contains('d-none')).toBe(true)
    expect(markdown).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('Should save cursor state going to and back from preview', () => {
    render(<TestComponent />)
    const previewButton = screen.getByRole('button', { name: 'Preview' })
    const writeButton = screen.getByRole('button', { name: 'Write' })
    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Hello,{enter}World!')
    expect(textbox.value).toBe('Hello,\nWorld!')

    textbox.setSelectionRange(7, 13)
    userEvent.click(previewButton)
    expect(textbox.classList.contains('d-none')).toBe(true)

    userEvent.click(writeButton)
    userEvent.type(textbox, '{backspace}Tom!')
    expect(textbox.value).toBe('Hello,\nTom!')
  })
  test('Should automatically resize to fit content', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')
    expect(textbox.style.height).toBe('')
    userEvent.type(
      textbox,
      'Hello,{enter}{enter}{enter}{enter}{enter}{enter}Tom!'
    )

    // Only picks up '+2px' additional padding as JSDOM doesnt properly mock styles
    // but this proves the code was exercised and is good enough for unit test
    expect(textbox.style.height).not.toBe('')
  })
  test('Show not auto resize after user sets height', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    const spy = jest
      .spyOn(textbox, 'clientHeight', 'get')
      .mockImplementation(() => 200)
      .mockImplementationOnce(() => 100)

    expect(textbox.style.height).toBe('')
    userEvent.click(textbox)
    expect(textbox.style.height).toBe('200px')

    userEvent.click(textbox)
    expect(textbox.style.height).toBe('200px')
    userEvent.type(
      textbox,
      'Lots{enter}{enter}{enter}{enter}o{enter}{enter}{enter}{enter}{enter}lines'
    )
    expect(textbox.style.height).toBe('200px')
  })
})
