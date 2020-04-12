// import libraries
import React from 'react'

// import types
import { ErrorDisplayProps } from './types'

const ErrorMessage: React.FC<ErrorDisplayProps> = ({ signupErrors }) => {
  return (
    <div className="bg-light m-auto px-5 border-0'">
      {signupErrors.confirmEmail ? (
        <h5 className="text-danger">
          An account has already been registered with this email
        </h5>
      ) : (
        ''
      )}
      {signupErrors.userName ? (
        <h5 className="text-danger">Username is already taken</h5>
      ) : (
        ''
      )}
    </div>
  )
}

export default ErrorMessage
