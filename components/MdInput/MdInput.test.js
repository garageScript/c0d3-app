import { mockUseIsMac } from '../../__mocks__/useIsMac.mock'
import '../../__mocks__/useBreakpoint.mock'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

jest.mock('../../helpers/useBreakpoint.tsx')

import useBreakpoint from '../../helpers/useBreakpoint.tsx'
import MdInput from './MdInput'

const TestComponent = () => {
  const [testState, setTestState] = React.useState('')
  return <MdInput onChange={setTestState} value={testState} />
}

describe('MdInput Component', () => {
  test('Should render text onto textbox when user types', async () => {
    const { container } = render(<TestComponent />)

    await userEvent.type(screen.getByRole('textbox'), 'Javascript')
    expect(screen.getByRole('textbox')).toHaveValue('Javascript')
    expect(container).toMatchSnapshot()
  })

  test('Should switch to Write mode when user clicks Write button', async () => {
    const { container } = render(<MdInput />)

    await userEvent.click(screen.getByRole('button', { name: 'Write' }))

    expect(screen.queryByTestId('markdown')).not.toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test("Should display 'Nothing to preview' when switching to Preview mode with no input", async () => {
    render(<MdInput />)

    await userEvent.click(screen.getByRole('button', { name: 'Preview' }))

    expect(screen.getByRole('textbox')).toHaveClass('d-none')
    expect(screen.getByText('Nothing to preview')).toBeInTheDocument()
  })

  test('Should display markdown preview text when switch to Preview mode with input', async () => {
    const { container } = render(<TestComponent />)

    const textbox = screen.getByRole('textbox')
    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Some **Text**')

    await userEvent.click(screen.getByRole('button', { name: 'Preview' }))

    expect(screen.getByRole('textbox')).toHaveClass('d-none')
    expect(screen.queryByTestId('markdown')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('Should save cursor state going to and back from preview', async () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Hello,{enter}World!')
    expect(textbox).toHaveValue('Hello,\nWorld!')

    await userEvent.click(screen.getByRole('button', { name: 'Preview' }))
    expect(textbox).toHaveClass('d-none')

    await userEvent.click(screen.getByRole('button', { name: 'Write' }))
    await userEvent.type(textbox, '{backspace}Tom!', {
      initialSelectionStart: 7,
      initialSelectionEnd: 13,
      skipClick: false
    })
    expect(textbox).toHaveValue('Hello,\nTom!')
  })
  test('Should automatically resize to fit content', () => {
    render(<TestComponent />)
    // autoSize function runs on first render with useEffect.
    // Only picks up '+2px' additional padding as JSDOM doesnt properly mock styles
    // but this proves the code was exercised and is good enough for unit test
    expect(screen.getByRole('textbox')).toHaveStyle('height: 2px')
  })
  test('Show not auto resize after user sets height', async () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    jest
      .spyOn(textbox, 'clientHeight', 'get')
      .mockImplementation(() => 200)
      .mockImplementationOnce(() => 100)

    expect(textbox).not.toHaveStyle('height: 200px')
    await userEvent.click(textbox)
    expect(textbox).toHaveStyle('height: 200px')

    await userEvent.click(textbox)
    expect(textbox).toHaveStyle('height: 200px')
    await userEvent.type(
      textbox,
      'Lots{enter}{enter}{enter}{enter}o{enter}{enter}{enter}{enter}{enter}lines'
    )
    expect(textbox).toHaveStyle('height: 200px')
  })
  test('Should render toolbar when on mobile', () => {
    expect.assertions(1)

    render(<TestComponent />)

    useBreakpoint.mockImplementation(() => true)

    expect(screen.getByRole('toolbar')).toBeInTheDocument()
  })
  test('Undo should restore previous text', async () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Hello,{enter}Tom!!')

    expect(textbox).toHaveValue('Hello,\nTom!!')
    await userEvent.type(textbox, '{Control>}zz')
    expect(textbox).toHaveValue('Hello,\nTom')
  })
  test('Undo should stop if there is no text to undo', async () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Tom')

    expect(textbox).toHaveValue('Tom')
    await userEvent.type(textbox, '{Control>}zzzzzzz')
    expect(textbox).toHaveValue('')
  })
  test('Redo should restore previous text from undo', async () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Hello,{enter}Tom!!')

    expect(textbox).toHaveValue('Hello,\nTom!!')
    await userEvent.type(textbox, '{Control>}zz')
    expect(textbox).toHaveValue('Hello,\nTom')
    await userEvent.type(textbox, '{Control>}yy')
    expect(textbox).toHaveValue('Hello,\nTom!!')
  })
  test('Redo should stop if there is no text to redo', async () => {
    expect.assertions(3)

    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')

    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Tom')

    expect(textbox).toHaveValue('Tom')
    await userEvent.type(textbox, '{Control>}zzzzzzz')
    expect(textbox).toHaveValue('')
    await userEvent.type(textbox, '{Control>}yyyyyyy')
    expect(textbox).toHaveValue('Tom')
  })
  test('Undo/Redo history should be reset if state is updated outside of component', async () => {
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

    await userEvent.click(textbox)
    await userEvent.type(textbox, 'Tom')

    expect(textbox).toHaveValue('Tom')
    await userEvent.type(textbox, '{Control>}z')
    expect(textbox).toHaveValue('To')
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }))

    expect(textbox).toHaveValue('Reset')
    await userEvent.type(textbox, '{Control>}z')
    expect(textbox).toHaveValue('Reset')
    await userEvent.type(textbox, '{Control>}y')
    expect(textbox).toHaveValue('Reset')
  })
  test('Should exercise handleMarkdown and insert bold markdown style ', async () => {
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')
    await userEvent.type(textbox, '{Control>}b')
    expect(textbox).toHaveValue('****')
  })
  test('Should exercise handleMarkdown and insert bold markdown style with mac hotkey ', async () => {
    mockUseIsMac.mockImplementationOnce(() => true)
    render(<TestComponent />)
    const textbox = screen.getByRole('textbox')
    await userEvent.type(textbox, '{meta>}b')
    expect(textbox).toHaveValue('****')
  })
})
