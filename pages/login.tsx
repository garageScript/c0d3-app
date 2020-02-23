import * as React from 'react'
import { Formik, Form, Field } from 'formik'
import Input from '../components/Input'
import { signupValidation } from '../helpers/formValidation'
import { Props } from '../@types/login'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Link from 'next/link'

const initialValues = {
  username: '',
  password: ''
}

const Login: React.FC<Props> = props => {
  return (
    <Layout>
      <Card title="Login">
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={signupValidation}
          onSubmit={values => props.submitLogin(values)}
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
