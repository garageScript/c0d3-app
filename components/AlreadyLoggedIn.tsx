import React from 'react'
import { LogoutContainer } from './LogoutContainer'
import Card from './Card'

export const AlreadyLoggedIn: React.FC = () => {
  return (
    <Card title="You are already logged in.">
      <LogoutContainer>
        <button className="btn btn-primary">Click to Logout</button>
      </LogoutContainer>
    </Card>
  )
}

export default AlreadyLoggedIn
