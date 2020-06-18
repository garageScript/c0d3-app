import React from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PASSWORD } from '../../graphql/queries'
import Alert from '../../components/Alert'
import Input from '../../components/Input'
import { confirmPasswordValidation } from '../../helpers/formValidation'
import Layout from '../../components/Layout'
import Card from '../../components/Card'

const initialValues = {
  password: '',
  confirmPassword: ''
}

const ConfirmSuccess: React.FC = () => (
  <Card success title="Password has been set!">
    <a className="btn btn-primary btn-lg mb-3" role="button" href="/curriculum">
      Continue to dashboard
    </a>
  </Card>
)

export const ResetPassword: React.FC = () => {
  const router = useRouter()
  const [changePw, { data, error }] = useMutation(UPDATE_PASSWORD)
  const handleSubmit = async ({ password }: typeof initialValues) => {
    try {
      await changePw({
        variables: {
          token: router.query.token,
          password
        }
      })
    } catch {} // catch error thrown by default from apollo mutations
  }

  if (data && data.changePw.success) {
    return <ConfirmSuccess />
  }

  return (
    <Card title="Enter new password">
      {error && (
        <Alert
          alert={{
            text: 'Link has expired. Request a new password reset',
            type: 'urgent'
          }}
        />
      )}
      <p className="mb-4">Your password should contain minimum 6 characters.</p>
      <Formik
        validateOnBlur
        initialValues={initialValues}
        validationSchema={confirmPasswordValidation}
        onSubmit={handleSubmit}
      >
        <Form data-testid="form">
          <div className="form-group">
            <Field
              name="password"
              placeholder="Enter new password"
              data-testid="password"
              type="password"
              as={Input}
            />

            <Field
              name="confirmPassword"
              placeholder="Re-enter new password"
              data-testid="confirmPassword"
              type="password"
              as={Input}
            />

            <button
              className="btn btn-primary btn-lg btn-block mb-3"
              type="submit"
              data-testid="submit"
            >
              Reset Password
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
