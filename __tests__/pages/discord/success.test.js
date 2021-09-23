import React from 'react'
import ConnectToDiscordSuccess from '../../../pages/discord/success'
import { render } from '@testing-library/react'

describe('connect to Discord success page', () => {
  it('should render page', () => {
    const { container } = render(<ConnectToDiscordSuccess />)
    expect(container).toMatchSnapshot()
  })
})
