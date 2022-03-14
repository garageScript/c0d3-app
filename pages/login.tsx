import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { loginValidation } from '../helpers/formValidation'
import { getLayout } from '../components/Layout'
import Card from '../components/Card'
import NavLink from '../components/NavLink'
import Alert from '../components/Alert'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { WithLayout } from '../@types/page'
import Title from '../components/Title'
import { Button, Spinner } from 'react-bootstrap'
import { signIn } from 'next-auth/react'
import { SignInReturn } from '../@types/auth'

type Values = {
  username: string
  password: string
}

type LoginFormProps = {
  handleSubmit: (values: Values) => void
  loginError?: string
  isLoading?: boolean
}

type ErrorDisplayProps = {
  loginError?: string
}

const initialValues = {
  username: '',
  password: ''
}

const ErrorMessages: React.FC<ErrorDisplayProps> = ({ loginError }) => {
  if (!loginError || !loginError.length) return <></>

  const message = loginError.split(':')[1]

  return <Alert alert={{ id: -1, text: message, type: 'urgent' }} />
}

export const Login: React.FC<LoginFormProps> = ({
  handleSubmit,
  loginError,
  isLoading
}) => (
  <Card title="Login">
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={handleSubmit}
    >
      <Form data-testid="form">
        <div className="form-group">
          <ErrorMessages loginError={loginError} />
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
                'Login to Your Account'
              )}
            </button>
          </div>
        </div>
      </Form>
    </Formik>
    <div>
      <Button
        onClick={() => {
          signIn('discord', { callbackUrl: '/curriculum' })
        }}
      >
        Login with Discord
      </Button>
    </div>
    <NavLink path="/forgotpassword" hoverUnderline>
      Forgot your password?
    </NavLink>
  </Card>
)

const LoginPage: React.FC & WithLayout = () => {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (values: Values) => {
    const response = (await signIn('credentials', {
      redirect: false,
      ...values
    })) as unknown as SignInReturn

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.ok) {
      window.localStorage.setItem('loggedIn', 'true')
      const { next } = router.query
      router.push(next ? (next as string) : '/curriculum')
    }
  }
  return (
    <>
      <Title title="Login" />
      <Login handleSubmit={handleSubmit} loginError={error} isLoading={false} />
    </>
  )
}

LoginPage.getLayout = getLayout
export default LoginPage
