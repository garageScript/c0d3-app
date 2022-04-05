import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Spoiler from './Spoiler'

describe('Spoiler component test', () => {
  test('Should render spoiler', async () => {
    const { container } = render(
      <Spoiler name="TestSpoiler">
        <h1>Hidden text</h1>
      </Spoiler>
    )
    expect(container).toMatchSnapshot()
    await userEvent.click(screen.getByText('TestSpoiler'))
    expect(screen.getByText('Hidden text')).toBeVisible()
    await userEvent.click(screen.getByText('TestSpoiler'))
  })
  test('Should render spoiler without name', () => {
    render(
      <Spoiler>
        <h1>Hidden text</h1>
      </Spoiler>
    )
    expect(screen.getByText('Answer')).toBeTruthy()
  })
})
