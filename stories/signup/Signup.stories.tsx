import * as React from 'react'
import Signup from '../../pages/signup'
import { Props } from '../../@types/signup'

export default {
  component: Signup,
  title: 'Pages/signup'
}

export const _Signup: React.FC<Props> = props => <Signup {...props} />
