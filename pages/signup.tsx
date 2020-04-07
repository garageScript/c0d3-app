//import libraries
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'

//import components
import Card from '../components/Card'
import Layout from '../components/Layout'
import Input from '../components/Input'

//import helpers
import { signupValidation } from '../helpers/formValidation'
import { signupUser } from '../helpers/signupUser'

//import types
import {
  SignupFormProps,
  Values,
  SignupErrors,
  ErrorDisplayProps
} from '../@types/signup'

const initialValues: Values = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: ''
}

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

const SignupSuccess: React.FC = () => (
  <Card success title="Account created successfully!">
    <Link href="/curriculum">
      <a className="btn btn-primary btn-lg mb-3"> Continue to Curriculum</a>
    </Link>
  </Card>
)

const SignupForm: React.FC<SignupFormProps> = ({
  signupErrors,
  handleSubmit
}) => {
  return (
    <Card title="Create Account">
      <ErrorMessage signupErrors={signupErrors} />
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={signupValidation}
        onSubmit={handleSubmit}
      >
        <Form data-testid="form">
          <div className="form-group ">
            <Field
              name="email"
              placeholder="Email address"
              type="email"
              data-testid="email"
              as={Input}
            />

            <Field
              name="username"
              placeholder="Username"
              data-testid="username"
              as={Input}
            />

            <Field
              name="password"
              placeholder="Password"
              type="password"
              data-testid="password"
              as={Input}
            />

            <Field
              name="firstName"
              placeholder="First name"
              data-testid="firstName"
              as={Input}
            />

            <Field
              name="lastName"
              placeholder="Last name"
              data-testid="lastName"
              as={Input}
            />

            <button
              className="btn btn-primary btn-lg btn-block mb-3"
              type="submit"
              data-testid="submit"
            >
              Create Account
            </button>
          </div>
        </Form>
      </Formik>
      <p className="text-black-50">
        Already have an account?{' '}
        <a href="/login" className="text-primary">
          Login
        </a>
      </p>
    </Card>
  )
}

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
