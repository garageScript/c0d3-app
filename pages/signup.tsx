import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Card from '../components/Card'
import Layout from '../components/Layout'
import Input from '../components/Input'

const initialValues = {
  email: '',
  userName: '',
  password: '',
  firstName: '',
  lastName: ''
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  userName: Yup.string()
    .max(20, 'Must be 15 characters or less')
    .required('Required'),
  password: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  firstName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required')
})

const Signup: React.FC = () => {
  // code
  return (
    <Layout>
      <Card title="Create Account">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          <Form>
            <div className="form-group ">
              <Input name="email" placeholder="Email address" type="email" />

              <Input name="userName" placeholder="Username" />

              <Input name="password" placeholder="Password" type="password" />

              <Input name="firstName" placeholder="First name" />

              <Input name="lastName" placeholder="Last name" />

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
}

export default Signup
