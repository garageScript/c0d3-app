import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { loginValidation } from '../helpers/formValidation'
import Layout from '../components/Layout'
import Card from '../components/Card'
import NavLink from '../components/NavLink'
import Alert from '../components/Alert'
import LOGIN_USER from '../graphql/queries/loginUser'
import { Values, LoginFormProps, ErrorDisplayProps } from '../@types/login'
import _ from 'lodash'
import { useRouter } from 'next/router'
import GET_APP from '../graphql/queries/getApp'

const initialValues = {
  username: '',
  password: ''
}

const ErrorMessages: React.FC<ErrorDisplayProps> = ({ loginErrors }) => {
  if (!loginErrors || !loginErrors.length) return <></>
  const errorMessages = loginErrors.map((message, idx) => {
    const formattedMessage = message.split(':')[1]
    return (
      <Alert
        key={idx}
        alert={{ id: -1, text: formattedMessage, type: 'urgent' }}
      />
    )
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
            <div className="mt-3">
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
          </div>
        </Form>
      </Formik>
      <NavLink path="/forgotpassword">Forgot your password?</NavLink>
    </Card>
  )
}

const LoginPage: React.FC = () => {
  const router = useRouter()
  const [loginErrors, setLoginErrors] = useState<string[]>([])
  const [loginUser, { data, error }] = useMutation(LOGIN_USER, {
    refetchQueries: [{ query: GET_APP }],
    //prevents additonal render with unauthorized state on redirect
    awaitRefetchQueries: true
  })
  // TODO: Error Handling for login / signup. Blocked by backend implementation.
  useEffect(() => {
    const { success } = _.get(data, 'login', false)
    if (success) {
      router.push('/curriculum')
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
    } catch {} // catch error that's thrown by default from mutation
  }
  return (
    <Layout>
      <Login handleSubmit={handleSubmit} loginErrors={loginErrors} />
    </Layout>
  )
}

export default LoginPage
