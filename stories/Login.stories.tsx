import * as React from 'react'
import { Login } from '../pages/login'

export default {
  component: Login,
  title: 'Pages/Login'
}
const noop = () => {}

const errorMessage = ['Incorrect username: Please try again!']

export const _Login: React.FC = () => <Login handleSubmit={noop} />

export const _LoginError: React.FC = () => (
  <Login handleSubmit={noop} loginErrors={errorMessage} />
)
