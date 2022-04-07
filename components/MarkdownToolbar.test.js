import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MarkdownToolbar from './MarkdownToolbar'
import { markdown } from '../helpers/textStylers'
jest.mock('../helpers/textStylers')
describe('MarkdownToolbar Component', () => {
  const mockTextArea = {}
  const mockRef = { current: mockTextArea }

  test('Should match screenshot', () => {
    const { container } = render(
      <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render "cmd" based hotkey tooltips for Mac users', () => {
    render(
      <MarkdownToolbar isMac={true} inputRef={mockRef} onChange={() => {}} />
    )
    expect(screen.queryAllByLabelText(/ctrl/).length).toBe(0)
    expect(screen.queryAllByLabelText(/cmd/).length).toBeGreaterThan(0)
  })
  test('Should render "ctrl" based hotkey tooltips for non Mac users', () => {
    render(
      <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
    )
    expect(screen.queryAllByLabelText(/ctrl/).length).toBeGreaterThan(0)
    expect(screen.queryAllByLabelText(/cmd/).length).toBe(0)
  })
  test('does not call onChange if inputRef.current is null', async () => {
    const nullRef = { current: null }
    const mockOnChange = jest.fn()
    render(
      <MarkdownToolbar
        isMac={false}
        inputRef={nullRef}
        onChange={mockOnChange}
      />
    )
    await userEvent.click(screen.getByRole('button', { name: /header/ }))
    expect(mockOnChange).not.toBeCalled()
  })

  describe('Buttons should call markdown stylers when clicked', () => {
    test('header calls -> markdown.header', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(screen.getByRole('button', { name: /header/ }))
      expect(markdown.header).toBeCalledWith(mockTextArea)
    })

    test('bold calls -> markdown.bold', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(screen.getByRole('button', { name: /bold/ }))
      expect(markdown.bold).toBeCalledWith(mockTextArea)
    })

    test('italic calls -> markdown.italic', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(screen.getByRole('button', { name: /italic/ }))
      expect(markdown.italic).toBeCalledWith(mockTextArea)
    })

    test('quote calls -> markdown.quote', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(screen.getByRole('button', { name: /quote/ }))
      expect(markdown.quote).toBeCalledWith(mockTextArea)
    })

    test('code calls -> markdown.code', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(screen.getByRole('button', { name: /code/ }))
      expect(markdown.code).toBeCalledWith(mockTextArea)
    })

    test('link calls -> markdown.link', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(screen.getByRole('button', { name: /link/ }))
      expect(markdown.link).toBeCalledWith(mockTextArea)
    })

    test('bulletList calls -> markdown.bulletList', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(
        screen.getByRole('button', { name: /bulleted list/ })
      )
      expect(markdown.bulletList).toBeCalledWith(mockTextArea)
    })

    test('orderedList calls -> markdown.orderedList', async () => {
      render(
        <MarkdownToolbar isMac={false} inputRef={mockRef} onChange={() => {}} />
      )
      await userEvent.click(
        screen.getByRole('button', { name: /numbered list/ })
      )
      expect(markdown.orderedList).toBeCalledWith(mockTextArea)
    })
  })
})
