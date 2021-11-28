import React from 'react'
import ConnectToDiscordModal from './ConnectToDiscordModal'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'

describe('ConnectToDiscordModal component', () => {
  it('should call close modal function if user opts out of connecting to Discord', async () => {
    let res = ''
    const expectedResult = 'potatus maximus'
    render(
      <ConnectToDiscordModal show={true} close={() => (res = expectedResult)} />
    )
    await waitFor(() => fireEvent.click(screen.getByText(/No thanks/)))
    expect(res).toEqual(expectedResult)
  })
  it('should not show modal if user opts out of connecting to Discord', async () => {
    const mockProps = {
      show: true,
      close: jest.fn()
    }
    render(<ConnectToDiscordModal {...mockProps} />)
    await waitFor(() => fireEvent.click(screen.getByText(/No thanks/)))
    expect(mockProps.close).toHaveBeenCalledTimes(1)
  })
})
