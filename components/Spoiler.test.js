import * as React from 'react'
import { render, screen } from '@testing-library/react'
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
    userEvent.click(screen.getByText('TestSpoiler'))
    expect(screen.getByText('Hidden text')).toBeTruthy
    userEvent.click(screen.getByText('TestSpoiler'))
  })
  test('Should render spoiler without name', () => {
    render(
      <Spoiler>
        <h1>Hidden text</h1>
      </Spoiler>
    )
    expect(screen.getByText('Answer')).toBeTruthy()
  })
  test('Should render spoiler with offset', () => {
    const { container } = render(
      <Spoiler offset="1em">
        <h1>Hidden text</h1>
      </Spoiler>
    )
    expect(container).toMatchSnapshot()
  })
})
