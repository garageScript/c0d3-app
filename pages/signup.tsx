import { useMutation } from '@apollo/client'
//import libraries
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import _ from 'lodash'

//import components
import Card from '../components/Card'
import Layout from '../components/Layout'
import Input from '../components/Input'
import NavLink from '../components/NavLink'

//import helpers
import { signupValidation } from '../helpers/formValidation'
import SIGNUP_USER from '../graphql/queries/signupUser'

//import types
import {
  SignupFormProps,
  Values,
  ErrorDisplayProps,
  SignupSuccessProps
} from '../@types/signup'

const initialValues: Values = {
  email: '',
  username: '',
  firstName: '',
  lastName: ''
}

const ErrorMessage: React.FC<ErrorDisplayProps> = ({ signupErrors }) => {
  if (!signupErrors || !signupErrors.length) return <></>
  const errorMessages = signupErrors.map((message, idx) => {
    const formattedMessage = message.split(':')[1]
    return (
      <div
        key={idx}
        data-testid="error-message"
        className="bg-light m-auto px-5 border-0"
      >
        <h5 className="text-danger">{formattedMessage}</h5>
      </div>
    )
  })
  return <>{errorMessages}</>
}

const SignupSuccess: React.FC<SignupSuccessProps> = ({ forgotToken }) => (
  <Card
    type="success"
    data-testid="signup-success"
    title="Account created successfully!"
  >
    <p>
      Link to set your password:
      <a>{`https://www.c0d3.com/confirm/${forgotToken}`}</a>
    </p>
  </Card>
)

const SignupForm: React.FC<SignupFormProps> = ({
  signupErrors,
  isLoading,
  handleSubmit
}) => {
  return (
    <Card title="Create Account">
      <ErrorMessage signupErrors={signupErrors} />
      {isLoading && (
        <div className="bg-light m-auto px-5 border-0">
          <h5 data-testid="signup-loading" className="text-warning">
            Submitting...
          </h5>
        </div>
      )}
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
        <NavLink path="/login" className="text-primary">
          Login
        </NavLink>
      </p>
    </Card>
  )
}

const SignUpPage: React.FC = () => {
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [forgotToken, setForgotToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupErrors, setSignupErrors] = useState<string[]>([])
  const [signupUser] = useMutation(SIGNUP_USER)
  const handleSubmit = async (values: Values) => {
    console.log('submitting')
    setIsSubmitting(true)
    try {
      const { data } = await signupUser({ variables: values })
      if (data.signup.success) {
        console.log('success!!', data.signup)
        setForgotToken(data.signup.cliToken)
        return setSignupSuccess(true)
      }
      const err = new Error(
        'Server Error: Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com'
      )
      throw err
    } catch (error) {
      const graphQLErrors = _.get(error, 'graphQLErrors', [error])
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message]
        },
        []
      )
      setSignupErrors([...errorMessages])
    }
    setIsSubmitting(false)
  }
  return (
    <Layout title="Sign up">
      <Signup
        handleSubmit={handleSubmit}
        isLoading={isSubmitting}
        isSuccess={signupSuccess}
        forgotToken={forgotToken}
        signupErrors={signupErrors}
      />
    </Layout>
  )
}

export const Signup: React.FC<SignupFormProps> = ({
  handleSubmit,
  isSuccess,
  signupErrors,
  isLoading,
  forgotToken
}) => {
  return (
    <>
      {isSuccess ? (
        <SignupSuccess forgotToken={forgotToken} />
      ) : (
        <SignupForm
          handleSubmit={handleSubmit}
          signupErrors={signupErrors}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default SignUpPage
