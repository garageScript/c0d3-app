import * as React from 'react'
import Login from '../pages/login'
import { Props } from '../@types/login'

export default {
  component: Login,
  title: 'Pages/signin'
}

export const Signin: React.FC<Props> = props => <Login submitLogin={() => {}} />
