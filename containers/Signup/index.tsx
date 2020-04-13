// import libraries
import React, { useState } from 'react'

// import components
import Layout from '../../components/Layout'

// import signup components
import SignupSuccess from './SignupSuccess'
import SignupForm from './SignupForm'

// import helpers
import { signupUser } from '../../helpers/signupUser'

// import types
import { Values, SignupErrors } from './types'

const Signup: React.FC = () => {
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupErrors, setSignupErrors] = useState({} as SignupErrors)
  const handleSubmit = async (values: Values) => {
    const data = await signupUser(values)
    if (data.success) {
      setSignupSuccess(true)
    } else {
      setSignupErrors(Object.assign({}, data.errorMessage))
    }
  }
  return (
    <Layout>
      {signupSuccess ? (
        <SignupSuccess />
      ) : (
        <SignupForm handleSubmit={handleSubmit} signupErrors={signupErrors} />
      )}
    </Layout>
  )
}

export default Signup
