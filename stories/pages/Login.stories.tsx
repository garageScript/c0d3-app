import * as React from 'react'
import LoginPage, { Login } from '../../pages/login'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'

export default {
  component: Login,
  title: 'Pages/Login'
}

const noop = () => {}

const errorMessage = ['Incorrect username: Please try again!']

export const _Login: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: null,
          lessons: [],
          alerts: []
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LoginPage />
    </MockedProvider>
  )
}

export const LoginBasic: React.FC = () =>
  withTestRouter(<Login handleSubmit={noop} />)

export const LoginError: React.FC = () =>
  withTestRouter(<Login handleSubmit={noop} loginErrors={errorMessage} />)
