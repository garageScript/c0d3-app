import React from 'react'
import Error from './Error'
import { MockedProvider } from '@apollo/react-testing'
import { render, fireEvent, waitFor } from '@testing-library/react'
jest.mock('next/router')
import Router from 'next/router'

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/not-root' } // make sure pathname isnt '/' by default
})

Router.push.mockImplementation(args => (window.location.pathname = args))

describe('Error component', () => {
  it('button should return to home on press', async () => {
    const { getByRole } = render(
      <MockedProvider>
        <Error title="test" src="/500.png" />
      </MockedProvider>
    )
    const button = getByRole('button', { name: /Back/ })
    fireEvent.click(button)
    await waitFor(() => expect(global.window.location.pathname).toEqual('/'))
  })
})
