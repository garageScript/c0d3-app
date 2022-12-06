import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import NavLink from '../../components/NavLink'
import Input from '../../components/Input'
import { confirmPasswordValidation } from '../../helpers/formValidation'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import { signIn, SignInResponse } from 'next-auth/react'
import Error from '../../components/Error'

const initialValues = {
  password: '',
  confirmPassword: ''
}

const ConfirmSuccess: React.FC = () => (
  <Card type="success" title="Password has been set!">
    <Link href="/curriculum">
      <a className="btn btn-primary btn-lg mb-3">Continue to dashboard</a>
    </Link>
  </Card>
)

const ExpiredToken: React.FC = () => (
  <Card type="fail" title="Link has expired.">
    <NavLink path="/forgotpassword" className="btn btn-primary">
      Request a new password reset
    </NavLink>
  </Card>
)

export const ResetPassword = ({
  onServerError
}: {
  onServerError: () => void
}) => {
  const router = useRouter()
  const [confirmToken, setConfirmToken] = useState<SignInResponse>()
  const handleSubmit = async ({ password }: typeof initialValues) => {
    try {
      const confirmTokenResponse: SignInResponse = (await signIn(
        'confirm-token',
        {
          token: router.query.token,
          password,
          redirect: false
        }
      ))!

      setConfirmToken(confirmTokenResponse)
    } catch {} // catch error thrown by default from apollo mutations
  }

  if (confirmToken?.ok) {
    return <ConfirmSuccess />
  }

  if (confirmToken?.status === 401 && !confirmToken.error) {
    onServerError()
    return <></>
  }
  if (confirmToken?.error) return <ExpiredToken />

  return (
    <Card title="Enter new password">
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
              autoFocus
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

export const ResetPasswordContainer = () => {
  const [serverError, setServerError] = useState(false)

  if (serverError) {
    return <Error code={500} />
  }
  return (
    <Layout title="Confirm">
      <ResetPassword onServerError={() => setServerError(true)} />
    </Layout>
  )
}

export default ResetPasswordContainer
