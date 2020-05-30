import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { RESET_PASSWORD } from '../graphql/queries'
import { resetPasswordValidation } from '../helpers/formValidation'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Card from '../components/Card'

const initialValues = {
  userOrEmail: ''
}

export const ResetPassword: React.FC = () => {
  const [reqPwReset, { data, error }] = useMutation(RESET_PASSWORD)
  const handleSubmit = ({ userOrEmail }: { userOrEmail: string }) => {
    reqPwReset({ variables: { userOrEmail } })
  }
  if (data) {
    return (
      <Card title="Password reset instructions sent" success={true}>
        <p>
          You will receive an email containing a link to reset your password.
        </p>
      </Card>
    )
  }
  // Can't use NavLink since page needs to reload.
  if (error) {
    return (
      <Card title="Username or Email does not exist">
        <a
          href="/forgotpassword"
          className="btn btn-primary btn-lg btn-block mb-3"
          role="button"
        >
          Go Back
        </a>
      </Card>
    )
  }
  return (
    <Card title="Reset your password">
      <p className="mb-5">
        Type in your email or username below and we`&lsquo`ll send you an email
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
  <Layout>
    <ResetPassword />
  </Layout>
)

export default ResetPasswordContainer
