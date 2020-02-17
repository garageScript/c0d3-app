import * as React from 'react'
import Signup from '../pages/signup'
import { Props } from '../@types/signup'

export default {
  component: Signup,
  title: 'Signup Page'
}

export const signupPage: React.FC<Props> = props => <Signup {...props} />
