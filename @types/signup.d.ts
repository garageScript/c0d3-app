export type Values = {
  email: string
  username: string
  firstName: string
  lastName: string
}

export type SignupFormProps = {
  handleSubmit: (values: Values) => void
  isLoading?: boolean
  signupErrors?: string[]
  isSuccess?: boolean
  forgotToken?: string
}

export type ErrorDisplayProps = {
  signupErrors?: string[]
}

export type SignupSuccessProps = {
  forgotToken?: string
}
