export type Values = {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

export type SignupFormProps = {
  handleSubmit: (values: Values) => void
  signupErrors?: string[]
  isSuccess?: boolean
}

export type ErrorDisplayProps = {
  signupErrors: string[]
}

