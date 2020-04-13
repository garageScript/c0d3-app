export type Values = {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

export type SignupFormProps = {
  handleSubmit: (values: Values) => void
  signupErrors: SignupErrors
}

export type ErrorDisplayProps = {
  signupErrors: SignupErrors
}

export type SignupErrors = {
  userName?: string[]
  confirmEmail?: string[]
}
