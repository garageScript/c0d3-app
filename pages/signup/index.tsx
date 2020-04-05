import React from 'react'
import Router from 'next/router'
import { Formik, Form, Field } from 'formik'
import Card from '../../components/Card'
import Layout from '../../components/Layout'
import Input from '../../components/Input'
import { signupValidation } from '../../helpers/formValidation'
import { Props, Values } from '../../@types/signup'
import { signupUser } from '../../helpers/signupUser'

const initialValues: Values = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: ''
}

const Signup: React.FC<Props> = () => {
  const handleSubmit = async (values: Values) => {
    const data = await signupUser(values)
    if (data.success) {
      Router.push('/signup/success')
      return
    }
  }
  return (
    <Layout>
      <Card title="Create Account">
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={signupValidation}
          onSubmit={handleSubmit}
        >
          <Form data-testid="form">
            <div className="form-group ">
              <Field
                name="email"
                placeholder="Email address"
                type="email"
                data-testid="email"
                as={Input}
              />

              <Field
                name="username"
                placeholder="Username"
                data-testid="username"
                as={Input}
              />

              <Field
                name="password"
                placeholder="Password"
                type="password"
                data-testid="password"
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
                className="btn btn-primary btn-lg btn-block mb-3"
                type="submit"
                data-testid="submit"
              >
                Create Account
              </button>
            </div>
          </Form>
        </Formik>
        <p className="text-black-50">
          Already have an account?{' '}
          <a href="/login" className="text-primary">
            Login
          </a>
        </p>
      </Card>
    </Layout>
  )
}

export default Signup
