import React from 'react'
import Card from '../components/Card'

const Signup: React.FC = () => {
  return (
    <Card
      success
      title="Create Account"
      text="Your password should contain minimum 8 characters containing letters, numbers and special characters"
    />
  )
}

export default Signup
