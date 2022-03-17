jest.mock('next-auth/react')

import React from 'react'
import ConnectToDiscordModal from './ConnectToDiscordModal'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'
import { signIn } from 'next-auth/react'

describe('ConnectToDiscordModal component', () => {
  it('should call close modal function if user opts out of connecting to Discord', async () => {
    expect.assertions(1)

    let res = ''
    const expectedResult = 'potatus maximus'
    render(
      <ConnectToDiscordModal show={true} close={() => (res = expectedResult)} />
    )
    await waitFor(() => fireEvent.click(screen.getByText(/No thanks/)))
    expect(res).toEqual(expectedResult)
  })
  it('should not show modal if user opts out of connecting to Discord', async () => {
    expect.assertions(1)

    const mockProps = {
      show: true,
      close: jest.fn()
    }
    render(<ConnectToDiscordModal {...mockProps} />)
    await waitFor(() => fireEvent.click(screen.getByText(/No thanks/)))
    expect(mockProps.close).toHaveBeenCalledTimes(1)
  })

  it('should call signIn function if user opts in of connecting to Discord', async () => {
    expect.assertions(1)

    const mockProps = {
      show: true,
      close: jest.fn()
    }
    render(<ConnectToDiscordModal {...mockProps} />)

    const button = screen.queryByText('Connect Now')

    fireEvent.click(button)

    expect(signIn).toBeCalledWith('discord', {
      callbackUrl: '/discord/success'
    })
  })
})
