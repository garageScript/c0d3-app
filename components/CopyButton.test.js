import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import CopyButton from './CopyButton'

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {}
  },
  configurable: true
})
const testText = 'Test Text'

describe('Copy Button component', () => {
  test('Should render correctly', () => {
    const { container } = render(<CopyButton value={testText} />)

    expect(container).toMatchSnapshot()
  })

  test('Button type should be set to primary on render', () => {
    const { container } = render(<CopyButton value={testText} />)

    const button = container.querySelector('.btn')
    expect(button.classList.contains('btn-outline-bg-mute')).toBeTruthy()
  })

  test('Button type should be set to success on copy', async () => {
    const { container } = render(<CopyButton value={testText} />)

    const button = container.querySelector('.btn')

    fireEvent.click(button)
    await waitFor(() =>
      expect(button.classList.contains('btn-outline-bg-success')).toBeTruthy()
    )
  })

  test('Button type should be set to info on error', async () => {
    // Reset clipboard so writeText is undefined
    Object.defineProperty(navigator, 'clipboard', {
      value: null
    })

    const { container } = render(<CopyButton value={testText} />)

    const button = container.querySelector('.btn')

    fireEvent.click(button)
    await waitFor(() =>
      expect(button.classList.contains('btn-outline-bg-info')).toBeTruthy()
    )
  })

  test('Button type should be primary after 2 seconds on successful copy', async () => {
    jest.useFakeTimers()
    jest.spyOn(global, 'setTimeout')

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {}
      }
    })

    const { container } = render(<CopyButton value={testText} />)

    const button = container.querySelector('.btn')
    fireEvent.click(button)

    await waitFor(() =>
      expect(button.classList.contains('btn-outline-bg-success')).toBeTruthy()
    )

    act(() => jest.advanceTimersByTime(2000))

    await waitFor(() => {
      expect(button.classList.contains('btn-outline-bg-mute')).toBeTruthy()
      expect(setTimeout).toHaveBeenCalled()
    })
  })
})
