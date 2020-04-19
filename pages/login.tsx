import React, { useState } from 'react'
import Router from 'next/router'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { loginValidation } from '../helpers/formValidation'
import Layout from '../components/Layout'
import Card from '../components/Card'
import NavLink from '../components/NavLink'
import Alert from '../components/Alert'
import { loginUser } from '../helpers/loginUser'

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

  // TODO: Error Handling for login / signup. Blocked by backend implementation.
  const handleSubmit = async (values: Values) => {
    const data = await loginUser(values.username, values.password)
    if (data) {
      Router.push('/curriculum')
      return
    }
    setIsAlertVisible(true)
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
                  text="Incorrect username or password: please try again"
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
