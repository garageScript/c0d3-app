import * as React from 'react'
import SignupPage, { Signup } from '../../pages/signup'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'

export default {
  component: Signup,
  title: 'Pages/Signup'
}

const noop = () => {}

const errorMessages = ['UserInput Error: User does not exist']

export const _Signup: React.FC = () => {
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
      <SignupPage />
    </MockedProvider>
  )
}

export const _SignupBasic: React.FC = () => <Signup handleSubmit={noop} />

export const _SignupSuccess: React.FC = () => <Signup handleSubmit={noop} />

export const _SignupErrors: React.FC = () => (
  <Signup handleSubmit={noop} signupErrors={errorMessages} />
)

export const _SignupLoading: React.FC = () => (
  <Signup handleSubmit={noop} isLoading={true} />
)
