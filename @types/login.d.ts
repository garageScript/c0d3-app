export type Values = {
  username: string
  password: string
}

export type LoginFormProps = {
  handleSubmit: (values: Values) => void
  loginErrors?: string[]
}

export type ErrorDisplayProps = {
  loginErrors?: string[]
}
