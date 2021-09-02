import React from 'react'
import ConnectToDiscordPage from '../../../pages/discord/connect'
import { render } from '@testing-library/react'

describe('connect to Discord page', () => {
  it('should render page', () => {
    const { container } = render(<ConnectToDiscordPage />)
    expect(container).toMatchSnapshot()
  })
})
