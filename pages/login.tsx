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
import _ from 'lodash'

const initialValues = {
  username: '',
  password: ''
}

type Values = {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [loginUser, { data, error }] = useMutation(LOGIN_USER)
  // TODO: Error Handling for login / signup. Blocked by backend implementation.
  useEffect(() => {
    const { success } = _.get(data, 'login', false)
    if (success) {
      window.location.pathname = '/curriculum'
    }
    if (error) {
      const message = _.get(error, 'message', '')
      if(message) {
        message.indexOf('Password') !== -1  ? setAlertText('Incorrect password: please try again') : setAlertText('Incorrect username: please try again')
      }
      setIsAlertVisible(true)
    }
  })
  const handleSubmit = async (values: Values) => {
    await loginUser({ variables: values })
  }
  return (
    <Layout>
      <Card title="Login">
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          <Form data-testid="form">
            <div className="form-group">
              {isAlertVisible && (
                <Alert
                  error
                  text={alertText}
                />
              )}
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
        <NavLink path="/forgotPassword">Forgot your password?</NavLink>
      </Card>
    </Layout>
  )
}

export default Login
