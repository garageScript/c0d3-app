import * as React from 'react'
import Router from 'next/router'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { loginValidation } from '../helpers/formValidation'
import { Props } from '../@types/login'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Link from 'next/link'

const SERVER_URL = process.env.SERVER_URL

const initialValues = {
  username: '',
  password: ''
}

type Values = {
  username: string
  password: string
}

// TODO: Error Handling for login / signup. Blocked by backend implementation.
const handleSubmit = async (values: Values) => {
  const res = await fetch(`${SERVER_URL}/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: values.username,
      password: values.password
    })
  })
  const data = await res.json()
  if (data.success) {
    Router.push('/curriculum')
  }
  return
}

const Login: React.FC<Props> = () => {
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
        <Link href="/forgotPassword">
          <a>Forgot your password?</a>
        </Link>
      </Card>
    </Layout>
  )
}

export default Login
