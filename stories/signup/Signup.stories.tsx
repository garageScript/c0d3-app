import * as React from 'react'
import { Signup } from '../../pages/signup'

export default {
  component: Signup,
  title: 'Components/Signup'
}

const noop = () => {}
const errorMessages = ['UserInput Error: User does not exist']
export const _Signup: React.FC = () => <Signup handleSubmit={noop} />

export const _SignupSuccess: React.FC = () => (
  <Signup handleSubmit={noop} isSuccess={true} />
)

export const _SignupErrors: React.FC = () => (
  <Signup handleSubmit={noop} signupErrors={errorMessages} />
)

export const _SignupLoading: React.FC = () => (
  <Signup handleSubmit={noop} isLoading={true} />
)
