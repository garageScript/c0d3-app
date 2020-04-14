import * as React from 'react'
import Curriculum from './curriculum'
import Home from './home'

import { AuthUserContext } from './_app'

const IndexPage: React.FC = () => {
  return (
    <AuthUserContext.Consumer>
      {user => {
        if (user) {
          return <Curriculum />
        } else {
          return <Home />
        }
      }}
    </AuthUserContext.Consumer>
  )
}

export default IndexPage
