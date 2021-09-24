import React from 'react'
import ConnectToDiscordPage from '../../../pages/discord/connect'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import LOGOUT_USER from '../../../graphql/queries/logoutUser'

describe('connect to Discord page', () => {
  it('should render page', () => {
    const mocks = [
      {
        request: {
          query: LOGOUT_USER
        },
        result: {
          data: {
            logout: {
              success: true,
              username: 'fake user',
              error: null
            }
          }
        }
      }
    ]
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConnectToDiscordPage />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
