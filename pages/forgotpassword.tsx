import { ApolloError, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import RESET_PASSWORD from '../graphql/queries/resetPassword'
import { resetPasswordValidation } from '../helpers/formValidation'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Card from '../components/Card'

const initialValues = {
  userOrEmail: ''
}

export const ResetPassword: React.FC = () => {
  const [error, setError] = useState<null | ApolloError>(null)
  const [reqPwReset, { data }] = useMutation(RESET_PASSWORD, {
    onError: setError
  })
  const handleSubmit = async ({ userOrEmail }: { userOrEmail: string }) => {
    try {
      await reqPwReset({ variables: { userOrEmail } })
    } catch {} // catch error that's thrown by default from mutation
  }
  if (data) {
    return (
      <Card title="Password reset instructions sent" type="success">
        <p>
          You will receive an email containing a link to reset your password.
        </p>
      </Card>
    )
  }
  if (error) {
    return (
      <Card title="Username or Email does not exist">
        <button
          className="btn btn-primary btn-lg btn-block mb-3"
          onClick={() => setError(null)}
          data-testid="back"
        >
          Go Back
        </button>
      </Card>
    )
  }
  return (
    <Card title="Reset your password">
      <p className="mb-5">
        Type in your email or username below and we&rsquo;ll send you an email
        with instructions on how to reset your password
      </p>
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={resetPasswordValidation}
        onSubmit={handleSubmit}
      >
        <Form data-testid="form">
          <div className="form-group">
            <Field
              name="userOrEmail"
              placeholder="Username or Email"
              data-testid="userOrEmail"
              type="text"
              as={Input}
              autoFocus
            />

            <button
              className="btn btn-primary btn-lg btn-block mb-3"
              type="submit"
              data-testid="submit"
            >
              Send Reset Email
            </button>
          </div>
        </Form>
      </Formik>
    </Card>
  )
}

export const ResetPasswordContainer = () => (
  <Layout title="Reset password">
    <ResetPassword />
  </Layout>
)

export default ResetPasswordContainer
