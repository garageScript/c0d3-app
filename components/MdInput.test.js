import { mockUseIsMac } from '../__mocks__/useIsMac.mock'
import '../__mocks__/useBreakpoint.mock'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MdInput } from './MdInput'

const TestComponent = () => {
  const [testState, setTestState] = React.useState('')
  return <MdInput onChange={setTestState} value={testState} />
}

describe('MdInput Component', () => {
  test('Should render text onto textbox when user types', () => {
    const { container } = render(<TestComponent />)

    userEvent.type(screen.getByRole('textbox'), 'Javascript')
    expect(screen.getByRole('textbox')).toHaveValue('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should switch to Write mode when user clicks Write button', () => {
    const { container } = render(<MdInput />)

    userEvent.click(screen.getByRole('button', { name: 'Write' }))

    expect(screen.queryByTestId('markdown')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test("Should display 'Nothing to preview' when switching to Preview mode with no input", () => {
    const { container } = render(<MdInput />)

    userEvent.click(screen.getByRole('button', { name: 'Preview' }))

    expect(screen.getByRole('textbox')).toHaveClass('d-none')
    expect(screen.getByText('Nothing to preview')).toBeInTheDocument()
  })

  test('Should display markdown preview text when switch to Preview mode with input', () => {
    const { container } = render(<TestComponent />)

    const textbox = screen.getByRole('textbox')
    userEvent.click(textbox)
    userEvent.type(textbox, 'Some **Text**')

    userEvent.click(screen.getByRole('button', { name: 'Preview' }))

    expect(screen.getByRole('textbox')).toHaveClass('d-none')
    expect(screen.queryByTestId('markdown')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('Should save cursor state going to and back from preview', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Hello,{enter}World!')
    expect(textbox).toHaveValue('Hello,\nWorld!')

    textbox.setSelectionRange(7, 13)
    userEvent.click(screen.getByRole('button', { name: 'Preview' }))
    expect(textbox).toHaveClass('d-none')

    userEvent.click(screen.getByRole('button', { name: 'Write' }))
    userEvent.type(textbox, '{backspace}Tom!')
    expect(textbox).toHaveValue('Hello,\nTom!')
  })
  test('Should automatically resize to fit content', () => {
    render(<TestComponent />)
    // autoSize function runs on first render with useEffect.
    // Only picks up '+2px' additional padding as JSDOM doesnt properly mock styles
    // but this proves the code was exercised and is good enough for unit test
    expect(screen.getByRole('textbox')).toHaveStyle('height: 2px')
  })
  test('Show not auto resize after user sets height', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    const spy = jest
      .spyOn(textbox, 'clientHeight', 'get')
      .mockImplementation(() => 200)
      .mockImplementationOnce(() => 100)

    expect(textbox).not.toHaveStyle('height: 200px')
    userEvent.click(textbox)
    expect(textbox).toHaveStyle('height: 200px')

    userEvent.click(textbox)
    expect(textbox).toHaveStyle('height: 200px')
    userEvent.type(
      textbox,
      'Lots{enter}{enter}{enter}{enter}o{enter}{enter}{enter}{enter}{enter}lines'
    )
    expect(textbox).toHaveStyle('height: 200px')
  })
  test('Undo should restore previous text', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Hello,{enter}Tom!!')

    expect(textbox).toHaveValue('Hello,\nTom!!')
    userEvent.type(textbox, '{ctrl}zz')
    expect(textbox).toHaveValue('Hello,\nTom')
  })
  test('Undo should stop if there is no text to undo', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Tom')

    expect(textbox).toHaveValue('Tom')
    userEvent.type(textbox, '{ctrl}zzzzzzz')
    expect(textbox).toHaveValue('')
  })
  test('Redo should restore previous text from undo', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Hello,{enter}Tom!!')

    expect(textbox).toHaveValue('Hello,\nTom!!')
    userEvent.type(textbox, '{ctrl}zz')
    expect(textbox).toHaveValue('Hello,\nTom')
    userEvent.type(textbox, '{ctrl}yy')
    expect(textbox).toHaveValue('Hello,\nTom!!')
  })
  test('Redo should stop if there is no text to redo', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Tom')

    expect(textbox).toHaveValue('Tom')
    userEvent.type(textbox, '{ctrl}zzzzzzz')
    expect(textbox).toHaveValue('')
    userEvent.type(textbox, '{ctrl}yyyyyyy')
    expect(textbox).toHaveValue('Tom')
  })
  test('Undo/Redo history should be reset if state is updated outside of component', () => {
    const TestRig = () => {
      const [value, setValue] = React.useState('')
      return (
        <div>
          <button onClick={() => setValue('Reset')}>Reset</button>
          <MdInput value={value} onChange={setValue} />
        </div>
      )
    }
    render(<TestRig />)

    const textbox = screen.getByRole('textbox')

    userEvent.click(textbox)
    userEvent.type(textbox, 'Tom')

    expect(textbox).toHaveValue('Tom')
    userEvent.type(textbox, '{ctrl}z')
    expect(textbox).toHaveValue('To')
    userEvent.click(screen.getByRole('button', { name: 'Reset' }))

    expect(textbox).toHaveValue('Reset')
    userEvent.type(textbox, '{ctrl}z')
    expect(textbox).toHaveValue('Reset')
    userEvent.type(textbox, '{ctrl}y')
    expect(textbox).toHaveValue('Reset')
  })
  test('Should exercise handleMarkdown and insert bold markdown style ', () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')
    userEvent.type(textbox, '{ctrl}b')
    expect(textbox).toHaveValue('****')
  })
  test('Should exercise handleMarkdown and insert bold markdown style with mac hotkey ', () => {
    mockUseIsMac.mockImplementationOnce(() => true)
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')
    userEvent.type(textbox, '{meta}b')
    expect(textbox).toHaveValue('****')
  })
})
