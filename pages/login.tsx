import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { loginValidation } from '../helpers/formValidation'
import Layout from '../components/Layout'
import Card from '../components/Card'
import NavLink from '../components/NavLink'
import Alert from '../components/Alert'
import { LOGIN_USER } from '../graphql/queries'
import { useMutation } from '@apollo/react-hooks'
import { Values, LoginFormProps, ErrorDisplayProps } from '../@types/login'
import _ from 'lodash'

const initialValues = {
  username: '',
  password: ''
}

const ErrorMessages: React.FC<ErrorDisplayProps> = ({ loginErrors }) => {
  if (!loginErrors || !loginErrors.length) return <></>
  const errorMessages = loginErrors.map((message, idx) => {
    const formattedMessage = message.split(':')[1]
    return <Alert key={idx} text={formattedMessage} error />
  })
  return <>{errorMessages}</>
}

export const Login: React.FC<LoginFormProps> = ({
  handleSubmit,
  loginErrors
}) => {
  return (
    <Card title="Login">
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={handleSubmit}
      >
        <Form data-testid="form">
          <div className="form-group">
            <ErrorMessages loginErrors={loginErrors} />
            <Field
              name="username"
              placeholder="Username"
              data-testid="username"
              as={Input}
            />

            <Field
              name="password"
              placeholder="Password"
              data-testid="password"
              type="password"
              as={Input}
            />

            <button
              className="btn btn-primary btn-lg btn-block mb-3"
              type="submit"
              data-testid="submit"
            >
              Login to Your Account
            </button>
          </div>
        </Form>
      </Formik>
      <NavLink path="/forgotpassword">Forgot your password?</NavLink>
    </Card>
  )
}

const LoginPage: React.FC = () => {
  const [loginErrors, setLoginErrors] = useState<string[]>([])
  const [loginUser, { data, error }] = useMutation(LOGIN_USER)
  // TODO: Error Handling for login / signup. Blocked by backend implementation.
  useEffect(() => {
    const { success } = _.get(data, 'login', false)
    if (success) {
      window.location.pathname = '/curriculum'
    }
    if (error) {
      const graphQLErrors: any = _.get(error, 'graphQLErrors', [])
      const errorMessages = graphQLErrors.reduce(
        (messages: any, error: any) => {
          return [...messages, error.message]
        },
        []
      )
      setLoginErrors([...errorMessages])
    }
  }, [data, error])
  const handleSubmit = async (values: Values) => {
    try {
      await loginUser({ variables: values })
    } catch {} //Error handled above
  }
  return (
    <Layout>
      <Login handleSubmit={handleSubmit} loginErrors={loginErrors} />
    </Layout>
  )
}

export default LoginPage
