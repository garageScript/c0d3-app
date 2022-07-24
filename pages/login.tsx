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
import { Spinner } from 'react-bootstrap'
import styles from '../scss/login.module.scss'
import { signIn, SignInResponse } from 'next-auth/react'
import Image from 'next/image'
import { withGetApp, GetAppProps } from '../graphql'
import AlreadyLoggedIn from '../components/AlreadyLoggedIn'

type Values = {
  username: string
  password: string
}

type LoginFormProps = {
  handleSubmit: (values: Values) => void
  loginErrors?: string[]
  isLoading?: boolean
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
  loginErrors,
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
              className={`btn ${
                isLoading ? 'btn-dark' : 'btn-primary'
              } btn-lg btn`}
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
    <div className={`d-grid mb-3`}>
      <div className={styles.orContainer}>
        <hr className={styles.lineLeft} />
        <span>OR</span>
        <hr className={styles.lineRight} />
      </div>
      <button
        onClick={() => signIn('discord', { callbackUrl: '/curriculum' })}
        className={`btn text-white btn-lg btn ${styles.discord__button}`}
      >
        <div className={styles.discord__button__image__wrapper}>
          <Image
            src="/assets/discordClydeLogoSmallWhite.svg"
            height={24}
            width={32}
          />
        </div>
        <span>Login with Discord</span>
      </button>
    </div>
    <NavLink path="/forgotpassword" hoverUnderline>
      Forgot your password?
    </NavLink>
  </Card>
)

const LoginPage: React.FC<GetAppProps> & WithLayout = ({
  data: sessionData
}) => {
  const router = useRouter()
  const [loginErrors, setLoginErrors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: Values) => {
    setIsLoading(true)

    const { error, status, ok }: SignInResponse = (await signIn('credentials', {
      ...values,
      redirect: false
    }))!

    if (error) {
      // 401 is an internal error by Next-Auth
      setLoginErrors([
        status === 401
          ? 'Server Error: Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com'
          : error
      ])
    }

    if (ok && !error) {
      window.localStorage.setItem('loggedIn', 'true')
      const { next } = router.query
      router.push(next ? (next as string) : '/curriculum')
    }

    setIsLoading(false)
  }

  //checks if user is already logged in
  const session = _.get(sessionData, 'session.user')
  if (session) return <AlreadyLoggedIn />

  return (
    <>
      <Title title="Login" />
      <Login
        handleSubmit={handleSubmit}
        loginErrors={loginErrors}
        isLoading={isLoading}
      />
    </>
  )
}

LoginPage.getLayout = getLayout
export default withGetApp()(LoginPage)
