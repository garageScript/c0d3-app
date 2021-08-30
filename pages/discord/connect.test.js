import React from 'react'
import ConnectToDiscordPage from './connect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'

const { push, query } = useRouter()

jest.mock('next/link', () => {
  return ({ children }) => {
    return children
  }
})

import Link from 'next/link'

describe('connect to Discord page', () => {
  it('should render page', () => {})

  it('should direct to curriculum page when user declines to connect to Discord', () => {
    const { getByTestId } = render(<ConnectToDiscordPage />)

    const connectButton = getByTestId('button')
    fireEvent.click(connectButton)

    await waitFor(() => expect(push).toBeCalledWith('/curriculum'))
  })

  it('should start Discord auth flow when connect to discord button is clicked', () => {})
})
