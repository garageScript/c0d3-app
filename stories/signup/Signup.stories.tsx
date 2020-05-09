import * as React from 'react'
import { Signup } from '../../pages/signup'

export default {
  component: Signup,
  title: 'Pages/signup'
}

export const _Signup: React.FC = () => <Signup handleSubmit={() => {}} />

export const _SignupSucess: React.FC = () => <Signup handleSubmit={() => {}} isSuccess={true} />

export const _SignupErrors: React.FC = () => <Signup handleSubmit={() => {}} signupErrors={['Hi']} />
