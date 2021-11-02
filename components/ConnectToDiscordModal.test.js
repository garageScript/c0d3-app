import React from 'react'
import ConnectToDiscordModal from './ConnectToDiscordModal'
import { render, waitFor, fireEvent, screen } from '@testing-library/react'

describe('ConnectToDiscordModal component', () => {
  it('should close modal if user opts out of connecting to Discord', async () => {
    let res = ''
    const expectedResult = 'potatus maximus'
    render(
      <ConnectToDiscordModal show={true} close={() => (res = expectedResult)} />
    )
    await waitFor(() => fireEvent.click(screen.getByText(/No thanks/)))
    expect(res).toEqual(expectedResult)
  })
})
