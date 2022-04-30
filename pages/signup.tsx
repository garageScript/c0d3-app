import { useMutation } from '@apollo/client'
//import libraries
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import _ from 'lodash'

//import components
import Card from '../components/Card'
import { getLayout } from '../components/Layout'
import Input from '../components/Input'
import NavLink from '../components/NavLink'

//import helpers
import { signupValidation } from '../helpers/formValidation'
import SIGNUP_USER from '../graphql/queries/signupUser'

import { WithLayout } from '../@types/page'
import Title from '../components/Title'
import { Spinner } from 'react-bootstrap'
import Alert from '../components/Alert'

type Values = {
  email: string
  username: string
  firstName: string
  lastName: string
}

type SignupFormProps = {
  handleSubmit: (values: Values) => void
  isLoading?: boolean
  signupErrors?: string[]
  isSuccess?: boolean
  forgotToken?: string
}

type ErrorDisplayProps = {
  signupErrors?: string[]
}

type SignupSuccessProps = {
  forgotToken?: string
}

const initialValues: Values = {
  email: '',
  username: '',
  firstName: '',
  lastName: ''
}

const ErrorMessage: React.FC<ErrorDisplayProps> = ({ signupErrors }) => {
  if (!signupErrors || !signupErrors.length) return <></>
  const errorMessages = signupErrors.map((message, idx) => {
    return <Alert key={idx} alert={{ id: -1, text: message, type: 'urgent' }} />
  })
  return <>{errorMessages}</>
}

const SignupSuccess: React.FC<SignupSuccessProps> = ({ forgotToken }) => (
  <Card
    type="success"
    data-testid="signup-success"
    title="Account created successfully!"
  >
    <NavLink path={`/confirm/${forgotToken}`} className="btn btn-primary">
      Click here to set your password.
    </NavLink>
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
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={signupValidation}
        onSubmit={handleSubmit}
      >
        <Form data-testid="form">
          <div className="form-group d-grid mt-3">
            <Field
              name="email"
              placeholder="Email address"
              type="email"
              data-testid="email"
              as={Input}
              autoFocus
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
              className={`btn ${
                isLoading ? 'btn-dark' : 'btn-primary'
              } btn-lg btn mb-3`}
              type="submit"
              data-testid="submit"
            >
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </Form>
      </Formik>
      <p className="text-black-50">
        Already have an account?{' '}
        <NavLink path="/login" className="text-primary" hoverUnderline>
          Login
        </NavLink>
      </p>
    </Card>
  )
}

const SignUpPage: React.FC & WithLayout = () => {
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [forgotToken, setForgotToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupErrors, setSignupErrors] = useState<string[]>([])
  const [signupUser] = useMutation(SIGNUP_USER)
  const handleSubmit = async (values: Values) => {
    setIsSubmitting(true)
    try {
      const { data } = await signupUser({ variables: values })
      if (data.signup.success) {
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
    <>
      <Title title="Sign up" />
      <Signup
        handleSubmit={handleSubmit}
        isLoading={isSubmitting}
        isSuccess={signupSuccess}
        forgotToken={forgotToken}
        signupErrors={signupErrors}
      />
    </>
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

SignUpPage.getLayout = getLayout
export default SignUpPage
