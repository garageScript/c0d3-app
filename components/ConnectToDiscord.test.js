import React from 'react'
import ConnectToDiscordCard from './ConnectToDiscordCard'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import LOGOUT_USER from '../graphql/queries/logoutUser'

describe('connect to Discord card', () => {
  it('should render card modal', () => {
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
        <ConnectToDiscordCard />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
})
