import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { loginValidation } from '../helpers/formValidation'
import { getLayout } from '../components/Layout'
import Card from '../components/Card'
import NavLink from '../components/NavLink'
import Alert from '../components/Alert'
import LOGIN_USER from '../graphql/queries/loginUser'
import _ from 'lodash'
import { useRouter } from 'next/router'
import GET_APP from '../graphql/queries/getApp'
import { WithLayout } from '../@types/page'
import Title from '../components/Title'

type Values = {
  username: string
  password: string
}

type LoginFormProps = {
  handleSubmit: (values: Values) => void
  loginErrors?: string[]
}

type ErrorDisplayProps = {
  loginErrors?: string[]
}

const initialValues = {
  username: '',
  password: ''
}

const ErrorMessages: React.FC<ErrorDisplayProps> = ({ loginErrors }) => {
  if (!loginErrors || !loginErrors.length) return <></>
  const errorMessages = loginErrors.map((message, idx) => {
    return <Alert key={idx} alert={{ id: -1, text: message, type: 'urgent' }} />
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
            <div className="mt-3 d-grid">
              <Field
                name="username"
                placeholder="Username"
                data-testid="username"
                as={Input}
                autoFocus
              />

              <Field
                name="password"
                placeholder="Password"
                data-testid="password"
                type="password"
                as={Input}
              />

              <button
                className="btn btn-primary btn-lg btn mb-3"
                type="submit"
                data-testid="submit"
              >
                Login to Your Account
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <NavLink path="/forgotpassword" hoverUnderline={true}>
        Forgot your password?
      </NavLink>
    </Card>
  )
}

const LoginPage: React.FC & WithLayout = () => {
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
      window.localStorage.setItem('loggedIn', 'true')
      const { next } = router.query
      router.push(next ? (next as string) : '/curriculum')
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
    <>
      <Title title="Login" />
      <Login handleSubmit={handleSubmit} loginErrors={loginErrors} />
    </>
  )
}

LoginPage.getLayout = getLayout
export default LoginPage
