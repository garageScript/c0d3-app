import React from 'react'
import { Formik, Form, Field } from 'formik'
import Router from 'next/router'

import Card from '../components/Card'
import Layout from '../components/Layout'
import Input from '../components/Input'
import { signupValidation } from '../helpers/formValidation'

const initialValues = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: ''
}

const Signup: React.FC = () => (
  <Layout>
    <Card title="Create Account">
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={signupValidation}
        onSubmit={async values => {
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          const data = await res.json()

          if (data) {
            Router.push('/api/graphql')
          }
        }}
      >
        <Form>
          <div className="form-group ">
            <Field
              name="email"
              placeholder="Email address"
              type="email"
              as={Input}
            />

            <Field name="username" placeholder="Username" as={Input} />

            <Field
              name="password"
              placeholder="Password"
              type="password"
              as={Input}
            />

            <Field name="firstName" placeholder="First name" as={Input} />

            <Field name="lastName" placeholder="Last name" as={Input} />

            <button
              className="btn btn-primary btn-lg btn-block mb-3"
              type="submit"
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

export default Signup
